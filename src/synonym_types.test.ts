import { describe, it, expect, beforeEach } from 'vitest';
import { AppState, saveState, loadState, STORAGE_KEY } from './utils';

describe('AppState with Synonyms', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and load synonyms correctly', () => {
    const state: AppState = {
      text: 'Test text',
      sentences: ['Test text'],
      currentSentenceIndex: 0,
      mistralKey: 'test-key',
      difficulty: 'original',
      synonyms: {
        0: [{ original: 'complex', synonym: 'difficult' }]
      }
    };

    saveState(state);
    const loaded = loadState();

    expect(loaded).not.toBeNull();
    expect(loaded?.synonyms).toBeDefined();
    expect(loaded?.synonyms?.[0]).toHaveLength(1);
    expect(loaded?.synonyms?.[0][0].original).toBe('complex');
    expect(loaded?.synonyms?.[0][0].synonym).toBe('difficult');
  });
});
