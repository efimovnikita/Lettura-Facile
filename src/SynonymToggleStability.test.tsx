import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';
import { saveState } from './utils';

// Mock Mistral service
vi.mock('./services/mistral', () => ({
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn(() => Promise.resolve([])),
  getSynonyms: vi.fn(() => Promise.resolve([])),
}));

describe('Synonym Toggle Stability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const setupAppWithSynonyms = async (sentence: string, originalWord: string) => {
    const mistralKey = 'test-key';
    const text = sentence;
    const sentences = [sentence];
    const synonyms = {
        0: [{ original: originalWord, synonym: 'synonym' }]
    };

    saveState({
        mistralKey,
        text,
        sentences,
        currentSentenceIndex: 0,
        difficulty: 'original',
        sentiments: {},
        synonyms
    });
    
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    
    await screen.findByText(new RegExp(sentence.split(' ')[0]));
  };

  const isToggleActive = () => {
    const thumb = screen.getByTestId('mode-switch-thumb');
    const iconContainer = thumb.querySelector('div');
    // Active toggle has 'text-indigo-600' or 'text-indigo-400'
    return iconContainer?.className.includes('text-indigo-600') || iconContainer?.className.includes('text-indigo-400');
  };

  it('should ENABLE toggle when an EXACT match is found', async () => {
    await setupAppWithSynonyms('Il gigante rassicurò subito.', 'rassicurò');

    await waitFor(() => {
        expect(isToggleActive()).toBe(true);
    });
  });

  it('should DISABLE toggle when word is HYPHENATED (no exact match)', async () => {
    await setupAppWithSynonyms('Il gigante rass-icurò subito.', 'rassicurò');

    await waitFor(() => {
        // Current behavior (FAILING): It will probably be true because it only checks if synonyms[0] exists
        // Desired behavior (PASSING): It should be false because 'rassicurò' is not in 'Il gigante rass-icurò subito.'
        expect(isToggleActive()).toBe(false);
    });
  });

  it('should DISABLE toggle when sentence has NO matching words', async () => {
    await setupAppWithSynonyms('Un altro testo.', 'rassicurò');

    await waitFor(() => {
        expect(isToggleActive()).toBe(false);
    });
  });
});
