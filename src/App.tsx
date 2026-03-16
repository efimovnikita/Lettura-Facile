import React, { useState, useEffect, useRef } from 'react';
import {
  Settings, BookOpen, ArrowRight, RotateCcw, Languages, Loader2, X,
  ClipboardPaste, ChevronDown, ChevronUp, Trash2, Zap, Heart,
  Sun, Theater, Flame, CloudRain, AlertCircle, Swords, History, CloudLightning
} from 'lucide-react';
import { AppState, saveState, loadState, splitIntoSentences, Difficulty, SentimentData, DisplayMode, SynonymData } from './utils';
import { translateWord, translateSentence, simplifySentence, getSentiments, getSynonyms } from './services/mistral';
import { useDictionary } from './hooks/useDictionary';
import { WordRenderer } from './components/WordRenderer';
import { SettingsPanel } from './components/SettingsPanel';
import { ThemeToggle } from './components/ThemeToggle';
import { ModeSwitch, Mode } from './components/ModeSwitch';
import { SentenceDisplay } from './components/SentenceDisplay';

const APP_VERSION = 'v1.7.4';

const ToneIndicator = ({ data, isLoading }: { data?: SentimentData, isLoading?: boolean }) => {
  if (isLoading) return <Loader2 className="w-4 h-4 text-stone-300 animate-spin" />;

  const config: Record<string, { icon: React.ReactNode, color: string, label: string }> = {
    neutral: { icon: <Zap className="w-4 h-4" />, color: 'text-slate-300', label: 'Neutrale' },
    positive: { icon: <Sun className="w-4 h-4" />, color: 'text-emerald-500', label: 'Felice' },
    irony: { icon: <Theater className="w-4 h-4" />, color: 'text-violet-500', label: 'Ironia' },
    aggressive: { icon: <Swords className="w-4 h-4" />, color: 'text-rose-600', label: 'Conflitto' },
    sad: { icon: <CloudRain className="w-4 h-4" />, color: 'text-sky-500', label: 'Triste' },
    urgent: { icon: <AlertCircle className="w-4 h-4" />, color: 'text-amber-500', label: 'Urgente' },
    romantic: { icon: <Heart className="w-4 h-4" />, color: 'text-rose-400', label: 'Romantico' },
    sexual: { icon: <Flame className="w-4 h-4" />, color: 'text-fuchsia-500', label: 'Passionale' },
    nostalgic: { icon: <History className="w-4 h-4" />, color: 'text-indigo-400', label: 'Nostalgico' },
    tension: { icon: <CloudLightning className="w-4 h-4" />, color: 'text-orange-400', label: 'Tensione' },
  };

  const current = data ? config[data.tone] : config.neutral;
  const color = data ? current.color : 'text-stone-200';

  return (
    <div className="flex flex-col items-center gap-0 min-h-[20px]">
      <div className={`transition-colors duration-500 ${color}`}>
        {current.icon}
      </div>

      {data && (
        <div className="flex flex-col items-center animate-fade-in">
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${color} opacity-80`}>
            {current.label} {Math.round(data.score * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [mistralKey, setMistralKey] = useState('');
  const [text, setText] = useState('');
  const [sentences, setSentences] = useState<string[]>([]);
  const [sentiments, setSentiments] = useState<Record<number, SentimentData>>({});
  const [synonyms, setSynonyms] = useState<SynonymData>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<'input' | 'reader'>('input');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('original');
  const { saveWordClick, clearDictionary, getWordIntensity, dictionary } = useDictionary();
  const lastClickTimeRef = useRef<number>(0);
  const lastProcessedIndexRef = useRef<number>(-1);
  const isAnalyzingRef = useRef(false);
  const isSynonymAnalyzingRef = useRef(false);
  const [sentimentRetryCounter, setSentimentRetryCounter] = useState(0);
  const [synonymRetryCounter, setSynonymRetryCounter] = useState(0);

  const [showSettings, setShowSettings] = useState(false);
  const [showWordList, setShowWordList] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);
// Reader State
const [currentSentenceText, setCurrentSentenceText] = useState('');
const [cachedVersions, setCachedVersions] = useState<Record<string, { simplified?: string, translated?: string }>>({});
const [translation, setTranslation] = useState<string | null>(null);
  const [wordTranslation, setWordTranslation] = useState<{word: string, translation: string} | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isSentenceLoading, setIsSentenceLoading] = useState(false);
  const [isWordLoading, setIsWordLoading] = useState(false);
  const [isTranslationLoading, setIsTranslationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tooltip State
  const [tooltipPosition, setTooltipPosition] = useState<{top: number, left: number, placement: 'top' | 'bottom'} | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<any>(null);

  // Load state on mount
  useEffect(() => {
    const loaded = loadState();
    if (loaded) {
      setMistralKey(loaded.mistralKey || '');
      setText(loaded.text || '');
      setSentences(loaded.sentences || []);
      setSentiments(loaded.sentiments || {});
      setSynonyms(loaded.synonyms || {});
      setCurrentIndex(loaded.currentSentenceIndex || 0);

      // displayMode is NOT loaded from state, it resets to 'original'

      if (loaded.sentences && loaded.sentences.length > 0) {
        setView('reader');
      }
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    saveState({
      text,
      sentences,
      currentSentenceIndex: currentIndex,
      mistralKey,
      difficulty: 'original', // Placeholder for backward compatibility
      sentiments,
      synonyms
    });
  }, [text, sentences, currentIndex, mistralKey, sentiments, synonyms]);

  // Scroll to top when sentence or display mode changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentIndex, displayMode]);

  useEffect(() => {
    const fetchSentenceVersion = async () => {
      if (sentences.length === 0) return;

      const original = sentences[currentIndex];

      // Always clear tooltips and selection when mode or index changes
      setWordTranslation(null);
      setTooltipPosition(null);
      setSelectedIndices([]);
      setError(null);

      // If index changed, we reset tracking and clear translation state
      if (lastProcessedIndexRef.current !== currentIndex) {
        setCurrentSentenceText(original);
        setTranslation(null);
        setShowSynonyms(false);
        lastProcessedIndexRef.current = currentIndex;
      }

      // Reset showSynonyms whenever displayMode changes
      setShowSynonyms(false);

      if (displayMode === 'original') {
        setCurrentSentenceText(original);
      } else if (displayMode === 'simplified') {
        // Check cache
        if (cachedVersions[original]?.simplified) {
          setCurrentSentenceText(cachedVersions[original].simplified!);
          return;
        }

        // Requirement: Show previous until ready
        setIsSentenceLoading(true);
        try {
          const simplified = await simplifySentence(mistralKey, original, 'simplified');
          const finalSentence = simplified
            .replace(/["']/g, '')
            .replace(/\s*\([^)]*\)/g, '')
            .trim();

          setCachedVersions(prev => ({
            ...prev,
            [original]: { ...prev[original], simplified: finalSentence }
          }));
          setCurrentSentenceText(finalSentence);
        } catch (err: any) {
          setError(err.message);
          if (!currentSentenceText) setCurrentSentenceText(original);
        } finally {
          setIsSentenceLoading(false);
        }
      } else if (displayMode === 'translated') {
        // Check cache
        if (cachedVersions[original]?.translated) {
          setCurrentSentenceText(cachedVersions[original].translated!);
          return;
        }

        // Requirement: Show previous until ready
        setIsTranslationLoading(true);
        try {
          const trans = await translateSentence(mistralKey, original);

          setCachedVersions(prev => ({
            ...prev,
            [original]: { ...prev[original], translated: trans }
          }));
          setCurrentSentenceText(trans);
          setTranslation(trans);
        } catch (err: any) {
          setError(err.message);
          if (!currentSentenceText) setCurrentSentenceText(original);
        } finally {
          setIsTranslationLoading(false);
        }
      }
    };

    fetchSentenceVersion();
  }, [currentIndex, displayMode, sentences, mistralKey, cachedVersions]);

  // Перехват данных из Share Target и автоматический старт чтения
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedTitle = params.get('title');
    const sharedText = params.get('text');
    const sharedUrl = params.get('url');

    const combinedText = [sharedTitle, sharedText, sharedUrl]
      .filter(Boolean)
      .join('\n\n');

    if (combinedText.trim()) {
      // 1. Сохраняем текст в состояние
      setText(combinedText);

      // 2. Автоматически разбиваем на предложения (используем импортированную функцию)
      const split = splitIntoSentences(combinedText);
      setSentences(split);
      setSentiments({}); // Сбрасываем старые данные
      setSynonyms({}); // Сбрасываем старые данные

      // 3. Сбрасываем прогресс чтения на начало
      setCurrentIndex(0);

      // 4. Принудительно переключаем интерфейс на экран чтения
      setView('reader');

      // 5. Очищаем URL, чтобы избежать повторного импорта при обновлении страницы
      window.history.replaceState(null, '', '/');
    }
  }, []);

  const handleImport = () => {
    const split = splitIntoSentences(text);
    setSentences(split);
    setSentiments({}); // Сбрасываем старые данные
    setSynonyms({}); // Сбрасываем старые данные
    setCurrentIndex(0);
    setView('reader');
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText(clipboardText);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      // Опционально: выведи ошибку пользователю, если доступ к буферу запрещен
      setError("Не удалось прочитать буфер обмена. Пожалуйста, разрешите доступ.");
    }
  };

  // Background Sentiment Analysis
  useEffect(() => {
    if (view !== 'reader' || !mistralKey || sentences.length === 0 || isAnalyzingRef.current) return;

    const findNextBatch = () => {
      const batchSize = 5;
      const unanalyzedIndices: number[] = [];

      // Сначала проверяем текущее предложение и ближайшие к нему
      // Но для простоты реализации пройдемся по всему списку
      for (let i = 0; i < sentences.length; i++) {
        if (!sentiments[i]) {
          unanalyzedIndices.push(i);
          if (unanalyzedIndices.length === batchSize) break;
        }
      }
      return unanalyzedIndices;
    };

    const batch = findNextBatch();
    if (batch.length === 0) return;

    const analyze = async () => {
      isAnalyzingRef.current = true;
      try {
        const batchSentences = batch.map(i => sentences[i]);
        const results = await getSentiments(mistralKey, batchSentences);

        setSentiments(prev => {
          const next = { ...prev };
          results.forEach((res, idx) => {
            if (batch[idx] !== undefined) {
              next[batch[idx]] = res;
            }
          });
          return next;
        });
      } catch (err) {
        console.error("Sentiment analysis error:", err);
      } finally {
        isAnalyzingRef.current = false;
        setSentimentRetryCounter(prev => prev + 1);
      }
    };

    const timeout = setTimeout(analyze, 2000); // Пауза 2 секунды между батчами
    return () => clearTimeout(timeout);
  }, [view, mistralKey, sentences, sentiments, sentimentRetryCounter]);

  // Background Synonym Extraction
  useEffect(() => {
    if (view !== 'reader' || !mistralKey || sentences.length === 0 || isSynonymAnalyzingRef.current) return;

    const findNextBatch = () => {
      const batchSize = 5;
      const unanalyzedIndices: number[] = [];

      for (let i = 0; i < sentences.length; i++) {
        if (!synonyms[i]) {
          unanalyzedIndices.push(i);
          if (unanalyzedIndices.length === batchSize) break;
        }
      }
      return unanalyzedIndices;
    };

    const batch = findNextBatch();
    if (batch.length === 0) return;

    const analyze = async () => {
      isSynonymAnalyzingRef.current = true;
      try {
        const batchSentences = batch.map(i => sentences[i]);
        const results = await getSynonyms(mistralKey, batchSentences);

        setSynonyms(prev => {
          const next = { ...prev };
          results.forEach((res, idx) => {
            if (batch[idx] !== undefined) {
              next[batch[idx]] = res;
            }
          });
          return next;
        });
      } catch (err) {
        console.error("Synonym analysis error:", err);
      } finally {
        isSynonymAnalyzingRef.current = false;
        setSynonymRetryCounter(prev => prev + 1);
      }
    };

    const timeout = setTimeout(analyze, 3000); // Пауза 3 секунды (чуть больше, чем для сентимента)
    return () => clearTimeout(timeout);
  }, [view, mistralKey, sentences, synonyms, synonymRetryCounter]);

  const performTranslation = async (phrase: string, rect: DOMRect) => {
    // We need to find the scrollable container (main)
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();

    // rect is from getBoundingClientRect of the word, which is absolute to viewport
    // containerRect is also absolute to viewport

    // Position relative to scrollContainer's viewport
    const relativeTop = rect.top - containerRect.top + scrollContainer.scrollTop;
    const relativeLeft = rect.left - containerRect.left + (rect.width / 2);

    // Decide placement based on space in the VIEWPORT of the container
    // If the word is at the top of the scrollable area, put tooltip below
    const placement = (rect.top - containerRect.top) > 100 ? 'top' : 'bottom';

    setTooltipPosition({
      top: placement === 'top' ? relativeTop - 10 : relativeTop + rect.height + 10,
      left: relativeLeft,
      placement
    });

    setWordTranslation({ word: phrase, translation: '' });
    setIsWordLoading(true);
    try {
      const trans = await translateWord(mistralKey, phrase, currentSentenceText);
      setWordTranslation({ word: phrase, translation: trans });
    } catch (err: any) {
      setError(err.message);
      setWordTranslation(null);
      setTooltipPosition(null);
    } finally {
      setIsWordLoading(false);
    }
  };

  const handleWordClick = (word: string, index: number, event: React.MouseEvent<HTMLSpanElement>) => {
      // 1. Фиксируем время текущего клика для определения двойного тапа
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTimeRef.current;
      lastClickTimeRef.current = now;

      // Сохраняем координаты для тултипа
      const rect = event.currentTarget.getBoundingClientRect();

      // Проверяем, нажат ли Ctrl (для десктопа)
      const isCtrlKey = event.ctrlKey || event.metaKey;

      // ==========================================
      // ЛОГИКА МУЛЬТИВЫДЕЛЕНИЯ (Ctrl+Click ИЛИ Двойной тап на мобилке)
      // ==========================================
      if (isCtrlKey || timeSinceLastClick < 400) { // Increased to 400ms
        // Prevent default browser behavior (like text selection on double click)
        event.preventDefault();

        // Отменяем одиночный клик, если он был запланирован
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
          clickTimeoutRef.current = null;
        }

        // Выделяем или снимаем выделение со слова
        let newIndices: number[] = [];
        if (selectedIndices.includes(index)) {
          newIndices = selectedIndices.filter(i => i !== index); // Снимаем
        } else {
          newIndices = [...selectedIndices, index].sort((a, b) => a - b); // Добавляем
        }
        setSelectedIndices(newIndices);

        // Если есть выделенные слова, переводим фразу
        if (newIndices.length > 0) {
          const allWords = currentSentenceText.split(' ');
          const phrase = newIndices.map(i => allWords[i].replace(/[.,!?;:"«»()]/g, '')).join(' ');
          performTranslation(phrase, rect);
        } else {
          // Если ничего не выделено, прячем тултип
          setWordTranslation(null);
          setTooltipPosition(null);
        }
        return; // Завершаем выполнение, дальше не идем
      }

      // ==========================================
      // ЛОГИКА ОДИНОЧНОГО КЛИКА (с задержкой)
      // ==========================================

      // Сбрасываем предыдущий таймаут на всякий случай
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      // Ждем 400мс. Если второго клика не будет, значит это точно одиночный
      clickTimeoutRef.current = window.setTimeout(() => {

        // 1. Сохраняем слово в словарь (ТОЛЬКО при одиночном клике!)
        saveWordClick(word);

        // 2. Снимаем мультивыделение, если оно было (чтобы одиночный клик его сбрасывал)
        setSelectedIndices([index]);

        // 3. Вызываем перевод для одного слова
        // Замени на твою функцию перевода одиночного слова, если она отличается:
        performTranslation(word.replace(/[.,!?;:"«»()]/g, ''), rect);

        clickTimeoutRef.current = null;
      }, 400); // Increased to 400ms
    };

  const nextSentence = () => {
    // Сбрасываем сложность на оригинал при переходе вперед
    setDisplayMode('original');
    setShowSynonyms(false);

    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Если это было последнее предложение:
      setView('input');
      setText(''); // Очищаем текст для новой порции
      setSentences([]); // Сбрасываем массив предложений
      setCurrentIndex(0); // Сбрасываем индекс
    }
  };

  const prevSentence = () => {
    if (currentIndex > 0) {
      // Сбрасываем сложность на оригинал при возврате назад
      setDisplayMode('original');
      setShowSynonyms(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const hasMatchingSynonyms = () => {
    const currentSynonyms = synonyms[currentIndex];
    if (!currentSynonyms || currentSynonyms.length === 0) return false;

    const words = currentSentenceText.split(' ');
    return words.some(word => {
      const cleanWord = word.replace(/[^\p{L}’'-]/gu, '').toLowerCase();
      return currentSynonyms.some(s => s.original.toLowerCase() === cleanWord);
    });
  };

  const closeTooltip = () => {
    setWordTranslation(null);
    setTooltipPosition(null);
    setSelectedIndices([]);
  };

  if (view === 'input') {
      return (
        <div key="input-view" className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col items-center justify-center p-6 animate-fade-in transition-colors duration-500">
          <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-8 border border-stone-200 dark:border-stone-800">

            {/* === ШАПКА === */}
            <div className="flex items-center justify-between gap-4 mb-6 w-full">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
                Lettura Facile
              </h1>

              <button
                onClick={() => setShowSettings(!showSettings)}
                // Добавили shrink-0, чтобы кнопка не сплющивалась, если заголовок длинный
                className={`p-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium shrink-0 ${
                  showSettings
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                title="Impostazioni"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Impostazioni</span>
              </button>
            </div>

            {/* === ИЗМЕНЕНИЕ 2: Выпадающая панель настроек === */}
            {showSettings && (
              <SettingsPanel
                mistralKey={mistralKey}
                setMistralKey={setMistralKey}
                dictionary={dictionary}
                showWordList={showWordList}
                setShowWordList={setShowWordList}
                clearDictionary={clearDictionary}
              />
            )}
            {/* === КОНЕЦ ПАНЕНИ НАСТРОЕК === */}

            {/* === БЛОК ВВОДА ТЕКСТА === */}
            <div className="flex justify-between items-end mb-2">
              <p className="text-stone-600 dark:text-stone-400 text-sm font-medium">
                Incolla il tuo testo:
              </p>
              <button
                onClick={handlePaste}
                className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md border border-indigo-100 dark:border-indigo-800 shadow-sm"
              >
                <ClipboardPaste className="w-3 h-3" />
                Incolla
              </button>
            </div>

            <textarea
              className="w-full h-64 p-4 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm mb-6 shadow-inner transition-colors"
              placeholder="Incolla qui il testo..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={handleImport}
              disabled={!text.trim() || !mistralKey}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              Importa Testo <ArrowRight className="w-5 h-5" />
            </button>

            {!mistralKey && (
              <p className="text-red-500 text-xs mt-3 text-center">
                * È necessaria una chiave API di Mistral nelle Impostazioni per procedere.
              </p>
            )}

          </div>

          {/* Номер версии */}
          <div className="mt-6 text-stone-400 text-xs font-mono">
            {APP_VERSION}
          </div>

        </div>
      );
    }

  // Reader View
  return (
    <div key="reader-view" className="h-[100dvh] bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col overflow-hidden animate-fade-in transition-colors duration-500">
      {/* Top Fixed Area */}
      <div className="z-20 bg-stone-50 dark:bg-stone-950 px-6 pt-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-1 lg:mb-4 max-w-5xl mx-auto w-full">
          <div className="w-full md:w-auto flex justify-between md:justify-start items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('input')}
                className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-2 transition-colors"
                aria-label="Nuovo Testo"
                title="Nuovo Testo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <ThemeToggle />
            </div>
            <span className="md:hidden text-sm text-stone-500 dark:text-stone-400 font-mono">
              {currentIndex + 1} / {sentences.length}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <span className="hidden md:inline text-sm text-stone-500 dark:text-stone-400 font-mono">
              {currentIndex + 1} / {sentences.length}
            </span>
          </div>
        </header>

        {/* Sentiment Barometer */}
        <div data-testid="tone-indicator-container" className="mb-0 lg:mb-1 py-0.5 lg:py-1 w-full flex justify-center">
          <ToneIndicator data={sentiments[currentIndex]} />
        </div>
      </div>

      {/* Middle Scrollable Area */}
      <main className="flex-1 overflow-y-auto px-6 max-w-4xl mx-auto w-full relative pb-10 md:pb-20" ref={containerRef}>
        <div className="flex flex-col items-center justify-start pt-1 lg:pt-4 min-h-full">
          {/* Error Message */}
          {error && (
            <div className="absolute top-0 left-6 right-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center mb-4 border border-red-100 dark:border-red-900/30 z-50">
              {error}
              <button onClick={() => setError(null)} className="ml-2 underline">Chiudi</button>
            </div>
          )}

          {/* Tooltip */}
          {wordTranslation && tooltipPosition && (
            <div
              className={`absolute z-20 bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-3 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200 max-w-xs transform -translate-x-1/2 ${
                tooltipPosition.placement === 'top' ? '-translate-y-full mb-2' : 'mt-2'
              }`}
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left
              }}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="opacity-75 text-xs mb-1">{wordTranslation.word}</div>
                  {isWordLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <div className="font-bold text-md leading-tight">{wordTranslation.translation}</div>
                  )}
                </div>
                <button onClick={closeTooltip} className="text-white/50 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Arrow */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-600 dark:bg-indigo-700 rotate-45 ${
                  tooltipPosition.placement === 'top' ? '-bottom-1.5' : '-top-1.5'
                }`}
              />
            </div>
          )}

          {/* Sentence Display */}
          <SentenceDisplay
            sentenceText={currentSentenceText}
            displayMode={displayMode}
            selectedIndices={selectedIndices}
            getWordIntensity={getWordIntensity}
            onWordClick={handleWordClick}
            isLoading={isSentenceLoading || isTranslationLoading}
            synonyms={synonyms[currentIndex]}
            showSynonyms={showSynonyms}
          />
        </div>
      </main>

      {/* Bottom Fixed Area */}
      <div className="z-20 bg-stone-50 dark:bg-stone-950 px-6 pb-6 landscape:pb-2 pt-2 landscape:pt-1">
        {/* Controls */}
        <div className="flex flex-col items-center gap-0 lg:gap-2 w-full max-w-4xl mx-auto">
          <ModeSwitch
            currentMode={displayMode}
            onChange={setDisplayMode}
            onThumbClick={() => setShowSynonyms(!showSynonyms)}
            hasSynonyms={hasMatchingSynonyms()}
            showSynonyms={showSynonyms}
            isLoading={isSentenceLoading || isTranslationLoading}
          />

          <div className="flex items-center gap-4 mt-0 lg:mt-2">
            <button
              onClick={prevSentence}
              disabled={currentIndex === 0 || isSentenceLoading}
              className="p-4 landscape:p-2.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-700 disabled:opacity-30 transition-all"
            >
              <ArrowRight className="w-6 h-6 landscape:w-5 landscape:h-5 rotate-180" />
            </button>

            <button
              onClick={nextSentence}
              disabled={isSentenceLoading}
              className="px-8 landscape:px-6 py-4 landscape:py-2.5 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-full font-medium text-lg landscape:text-base shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:shadow-indigo-300 dark:hover:shadow-indigo-900/50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentIndex === sentences.length - 1 ? (
                <>
                  <span className="landscape:hidden">Nuovo Testo</span>
                  <RotateCcw className="w-5 h-5 landscape:w-4 landscape:h-4" />
                </>
              ) : (
                <>
                  <span className="landscape:hidden">La prossima frase</span>
                  <ArrowRight className="w-5 h-5 landscape:w-4 landscape:h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
