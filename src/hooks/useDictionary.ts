import { useState, useEffect, useCallback } from 'react';
import { newStemmer } from 'snowball-stemmers';

// Инициализируем стеммер один раз
const stemmer = newStemmer('italian');
const STORAGE_KEY = 'lettura_my_words';

export type DictionaryState = Record<string, number>;

export function useDictionary() {
  const [dictionary, setDictionary] = useState<DictionaryState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Failed to read dictionary from localStorage', e);
      return {};
    }
  });

  // Синхронизация с Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dictionary));
  }, [dictionary]);

  // Очистка от пунктуации: оставляем только буквы
  const cleanWord = (word: string) => {
    return word.replace(/[^\p{L}]/gu, '').toLowerCase();
  };

  const getStem = (word: string) => {
    const cleaned = cleanWord(word);
    return cleaned ? stemmer.stem(cleaned) : '';
  };

  const saveWordClick = useCallback((word: string) => {
    const stem = getStem(word);
    if (!stem) return;

    setDictionary(prev => ({
      ...prev,
      [stem]: (prev[stem] || 0) + 1
    }));
  }, []);

  const clearDictionary = useCallback(() => {
    setDictionary({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getWordIntensity = useCallback((word: string): number => {
    const stem = getStem(word);
    return dictionary[stem] || 0;
  }, [dictionary]);

  return { saveWordClick, clearDictionary, getWordIntensity, dictionary };
}
