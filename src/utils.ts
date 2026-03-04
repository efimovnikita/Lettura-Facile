import { useState, useEffect } from 'react';

// Types
export type Difficulty = 'original' | 'simplified';
export type SentimentTone = 'neutral' | 'positive' | 'irony' | 'aggressive' | 'sad' | 'urgent' | 'sexual' | 'romantic' | 'nostalgic' | 'tension';

export interface SentimentData {
  tone: SentimentTone;
  score: number;
  explanation?: string;
}

export interface AppState {
  text: string;
  sentences: string[];
  currentSentenceIndex: number;
  mistralKey: string;
  difficulty: Difficulty;
  sentiments?: Record<number, SentimentData>;
}

export const STORAGE_KEY = 'lettura_facile_state';

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = (): AppState | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const splitIntoSentences = (text: string): string[] => {
  if (!text) return [];

  // 1. Убираем лишние пробелы и склеенные переносы строк
  let processedText = text.replace(/\s+/g, ' ').trim();

  // 2. Временно "прячем" многоточия, заменяя их на спецсимвол,
  // чтобы алгоритм не воспринимал их как конец предложения.
  processedText = processedText.replace(/\.\.\./g, '@@@');

  // 3. Разбиваем по знакам препинания (. ? !), за которыми следует пробел и Заглавная буква,
  // возможно предваряемая знаком тире или открывающими кавычками.
  const sentences = processedText
    .replace(/([.?!][»"']?)\s+(?=[«"']?[–—\p{Pd}]?\s*\p{Lu})/gu, "$1|")
    .split("|")
    .map(s => s.replace(/@@@/g, '...').trim()) // Возвращаем многоточия обратно
    .filter(s => s.length > 0);

  return sentences;
};
