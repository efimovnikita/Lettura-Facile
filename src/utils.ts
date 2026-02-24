import { useState, useEffect } from 'react';

// Types
export type Difficulty = 'original' | 'beginner' | 'intermediate' | 'advanced';

export interface AppState {
  text: string;
  sentences: string[];
  currentSentenceIndex: number;
  mistralKey: string;
  difficulty: Difficulty;
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
  // Basic sentence splitting (can be improved)
  // Matches periods, exclamation marks, question marks followed by space or end of string
  // Also handles newlines as delimiters
  if (!text) return [];
  return text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")
    .map(s => s.trim())
    .filter(s => s.length > 0);
};
