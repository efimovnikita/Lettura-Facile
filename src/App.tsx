import React, { useState, useEffect, useRef } from 'react';
import { Settings, BookOpen, ArrowRight, RotateCcw, Languages, Loader2, X, ClipboardPaste } from 'lucide-react';
import { AppState, saveState, loadState, splitIntoSentences, Difficulty } from './utils';
import { translateWord, translateSentence, simplifySentence } from './services/mistral';
import { useDictionary } from './hooks/useDictionary';
import { WordRenderer } from './components/WordRenderer';

const APP_VERSION = 'v1.2.2';

export default function App() {
  const [mistralKey, setMistralKey] = useState('');
  const [text, setText] = useState('');
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<'input' | 'reader'>('input');
  const [difficulty, setDifficulty] = useState<Difficulty>('original');
  const { saveWordClick, clearDictionary, getWordIntensity, dictionary } = useDictionary();
  const lastClickTimeRef = useRef<number>(0);

  const [showSettings, setShowSettings] = useState(false);

  // Reader State
  const [currentSentenceText, setCurrentSentenceText] = useState('');
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
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load state on mount
  useEffect(() => {
    const loaded = loadState();
    if (loaded) {
      setMistralKey(loaded.mistralKey || '');
      setText(loaded.text || '');
      setSentences(loaded.sentences || []);
      setCurrentIndex(loaded.currentSentenceIndex || 0);
      setDifficulty(loaded.difficulty || 'original');
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
      difficulty
    });
  }, [text, sentences, currentIndex, mistralKey, difficulty]);

  // Effect to handle difficulty changes or sentence navigation
  useEffect(() => {
    const fetchSentenceVersion = async () => {
      if (sentences.length === 0) return;

      const original = sentences[currentIndex];
      setTranslation(null);
      setWordTranslation(null);
      setTooltipPosition(null);
      setSelectedIndices([]);
      setError(null);

      if (difficulty === 'original') {
        setCurrentSentenceText(original);
      } else {
        setIsSentenceLoading(true);
        try {
          const simplified = await simplifySentence(mistralKey, original, difficulty);

          // Очистка: удаляем кавычки и любой текст в круглых скобках
          const finalSentence = simplified
            .replace(/["']/g, '')           // Убирает кавычки
            .replace(/\s*\([^)]*\)/g, '')   // Убирает (текст в скобках)
            .trim();

          setCurrentSentenceText(finalSentence);
        } catch (err: any) {
          setError(err.message);
          setCurrentSentenceText(original); // Fallback
        } finally {
          setIsSentenceLoading(false);
        }
      }
    };

    fetchSentenceVersion();
  }, [currentIndex, difficulty, sentences, mistralKey]);

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

  const performTranslation = async (phrase: string, rect: DOMRect) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Relative position to container
    const relativeTop = rect.top - containerRect.top;
    const relativeLeft = rect.left - containerRect.left + (rect.width / 2); // Center horizontally

    // Decide placement (default top, fallback bottom)
    const placement = relativeTop > 100 ? 'top' : 'bottom';

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
      if (isCtrlKey || timeSinceLastClick < 300) {
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

      // Ждем 300мс. Если второго клика не будет, значит это точно одиночный
      clickTimeoutRef.current = window.setTimeout(() => {

        // 1. Сохраняем слово в словарь (ТОЛЬКО при одиночном клике!)
        saveWordClick(word);

        // 2. Снимаем мультивыделение, если оно было (чтобы одиночный клик его сбрасывал)
        setSelectedIndices([index]);

        // 3. Вызываем перевод для одного слова
        // Замени на твою функцию перевода одиночного слова, если она отличается:
        performTranslation(word.replace(/[.,!?;:"«»()]/g, ''), rect);

        clickTimeoutRef.current = null;
      }, 300);
    };

  const handleWordDoubleClick = (index: number) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    // Toggle selection
    let newIndices: number[] = [];
    if (selectedIndices.includes(index)) {
      newIndices = selectedIndices.filter(i => i !== index);
    } else {
      newIndices = [...selectedIndices, index].sort((a, b) => a - b);
    }
    setSelectedIndices(newIndices);

    // Hide tooltip during selection manipulation
    setWordTranslation(null);
    setTooltipPosition(null);
  };

  const handleTranslateSentence = async () => {
    closeTooltip();
    setIsTranslationLoading(true);
    try {
      const trans = await translateSentence(mistralKey, currentSentenceText);
      setTranslation(trans);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsTranslationLoading(false);
    }
  };

  const nextSentence = () => {
    // Сбрасываем сложность на оригинал при переходе вперед
    setDifficulty('original');

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
      setDifficulty('original');
      setCurrentIndex(prev => prev - 1);
    }
  };

  const closeTooltip = () => {
    setWordTranslation(null);
    setTooltipPosition(null);
    setSelectedIndices([]);
  };

  if (view === 'input') {
      return (
        <div key="input-view" className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-stone-200">

            {/* === ШАПКА === */}
            <div className="flex items-center justify-between gap-4 mb-6 w-full">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 flex items-center gap-2">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600 shrink-0" />
                Lettura Facile
              </h1>

              <button
                onClick={() => setShowSettings(!showSettings)}
                // Добавили shrink-0, чтобы кнопка не сплющивалась, если заголовок длинный
                className={`p-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium shrink-0 ${
                  showSettings
                    ? 'bg-stone-200 text-stone-800'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700'
                }`}
                title="Impostazioni"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Impostazioni</span>
              </button>
            </div>

            {/* === ИЗМЕНЕНИЕ 2: Выпадающая панель настроек === */}
            {showSettings && (
              <div className="mb-6 p-5 bg-stone-50 border border-stone-200 rounded-xl animate-fade-in-down">
                <h3 className="text-sm font-semibold text-stone-700 mb-3 uppercase tracking-wider">
                  Configurazione
                </h3>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Mistral API Key
                  </label>
                  <input
                    type="password"
                    placeholder="Inserisci la tua API Key..."
                    value={mistralKey}
                    onChange={(e) => setMistralKey(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white"
                  />
                </div>

                {/* Кнопка управления словарем теперь живет здесь */}
                {Object.keys(dictionary).length > 0 && (
                  <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <span className="text-sm text-stone-600">
                      Parole in memoria: <strong>{Object.keys(dictionary).length}</strong>
                    </span>
                    <button
                      onClick={clearDictionary}
                      className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Svuota dizionario
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* === КОНЕЦ ПАНЕЛИ НАСТРОЕК === */}

            {/* === БЛОК ВВОДА ТЕКСТА === */}
            <div className="flex justify-between items-end mb-2">
              <p className="text-stone-600 text-sm">
                Incolla il tuo testo:
              </p>
              <button
                onClick={handlePaste}
                className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100"
              >
                <ClipboardPaste className="w-3 h-3" />
                Incolla
              </button>
            </div>

            <textarea
              className="w-full h-64 p-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm mb-6 shadow-inner"
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
                * È necessaria una chiave API Mistral nelle Impostazioni per procedere.
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
    <div key="reader-view" className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col p-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 md:mb-12 max-w-5xl mx-auto w-full">
        <div className="w-full md:w-auto flex justify-between md:justify-start items-center">
          <button onClick={() => setView('input')} className="text-stone-500 hover:text-stone-800 flex items-center gap-2 transition-colors">
            <RotateCcw className="w-4 h-4" /> Nuovo Testo
          </button>
          <span className="md:hidden text-sm text-stone-500 font-mono">
            {currentIndex + 1} / {sentences.length}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <span className="hidden md:inline text-sm text-stone-500 font-mono">
            {currentIndex + 1} / {sentences.length}
          </span>
          <div className="flex bg-white rounded-lg border border-stone-200 p-1 overflow-x-auto max-w-full w-full md:w-auto">
            {(['original', 'beginner', 'intermediate', 'advanced'] as Difficulty[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`px-3 py-1 text-xs rounded-md capitalize transition-colors whitespace-nowrap flex-1 md:flex-none text-center ${
                  difficulty === lvl
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-stone-500 hover:bg-stone-50'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full relative" ref={containerRef}>

        {/* Error Message */}
        {error && (
          <div className="absolute top-0 left-0 right-0 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4 border border-red-100 z-50">
            {error}
            <button onClick={() => setError(null)} className="ml-2 underline">Chiudi</button>
          </div>
        )}

        {/* Tooltip */}
        {wordTranslation && tooltipPosition && (
          <div
            className={`absolute z-20 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200 max-w-xs transform -translate-x-1/2 ${
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
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-600 rotate-45 ${
                tooltipPosition.placement === 'top' ? '-bottom-1.5' : '-top-1.5'
              }`}
            />
          </div>
        )}

        {/* Sentence Display */}
        <div className="text-center mb-12 w-full min-h-[120px] flex items-center justify-center">
          {isSentenceLoading ? (
             <div className="flex justify-center py-12">
               <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
             </div>
          ) : (
            <div className="text-4xl md:text-5xl font-serif leading-tight text-stone-800 select-none">
              {currentSentenceText.split(' ').map((word, index) => (
                <WordRenderer
                  key={`${index}-${word}`}
                  word={word}
                  index={index}
                  intensity={getWordIntensity(word)}
                  isSelected={selectedIndices.includes(index)} // ДОБАВЛЕНО: проверяем, выделено ли слово
                  onClick={handleWordClick}
                  onDoubleClick={handleWordDoubleClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Full Sentence Translation */}
        {translation && (
          <div className="mb-12 text-xl text-stone-500 font-light italic max-w-2xl text-center border-t border-stone-200 pt-6 animate-in fade-in slide-in-from-top-4">
            "{translation}"
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex gap-4">
            <button
              onClick={handleTranslateSentence}
              disabled={isTranslationLoading || isSentenceLoading}
              className="px-6 py-3 bg-white border border-stone-200 hover:border-indigo-300 hover:text-indigo-600 text-stone-600 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isTranslationLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
              Traduci Frase
            </button>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prevSentence}
              disabled={currentIndex === 0 || isSentenceLoading}
              className="p-4 rounded-full bg-white border border-stone-200 text-stone-400 hover:text-stone-800 hover:border-stone-300 disabled:opacity-30 transition-all"
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>

            <button
              onClick={nextSentence}
              disabled={isSentenceLoading}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium text-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentIndex === sentences.length - 1 ? (
                <>
                  Nuovo Testo <RotateCcw className="w-5 h-5" />
                </>
              ) : (
                <>
                  La prossima frase <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
