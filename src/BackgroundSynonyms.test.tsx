import { render, waitFor, act, fireEvent } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as mistral from './services/mistral';
import { splitIntoSentences } from './utils';
import { ThemeProvider } from './hooks/useTheme';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  RotateCcw: () => <div />,
  ClipboardPaste: () => <div />,
  ArrowRight: () => <div />,
  Settings: () => <div />,
  BookOpen: () => <div />,
  ChevronsUp: () => <div />,
  ChevronsDown: () => <div />,
  Zap: () => <div />,
  Sun: () => <div />,
  Moon: () => <div />,
  Theater: () => <div />,
  Swords: () => <div />,
  CloudRain: () => <div />,
  AlertCircle: () => <div />,
  Heart: () => <div />,
  Flame: () => <div />,
  History: () => <div />,
  CloudLightning: () => <div />,
  Loader2: () => <div />,
  X: () => <div />,
  Trash2: () => <div />,
  Languages: () => <div />,
  ChevronDown: () => <div />,
  ChevronUp: () => <div />,
  Volume2: () => <div />,
  Square: () => <div />,
}));

// Mock Mistral service
vi.mock('./services/mistral', async () => {
  const actual = await vi.importActual('./services/mistral');
  return {
    ...actual,
    getSynonyms: vi.fn().mockResolvedValue([[{ original: 'complesso', synonym: 'difficile' }]]),
    getSentiments: vi.fn().mockResolvedValue([{ tone: 'neutral', score: 0.5 }]),
  };
});

describe('Background Synonym Extraction', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should trigger synonym extraction in background', async () => {
    const state = {
      text: 'Questa è una frase complessa.',
      sentences: ['Questa è una frase complessa.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));

    render(<ThemeProvider><App /></ThemeProvider>);

    // Wait for the background extraction to be called (3 seconds timeout + some buffer)
    await waitFor(() => {
      expect(mistral.getSynonyms).toHaveBeenCalled();
    }, { timeout: 5000 });

    // Verify that synonyms are saved to localStorage
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem('lettura_facile_state') || '{}');
      expect(saved.synonyms).toBeDefined();
      expect(saved.synonyms[0]).toHaveLength(1);
      expect(saved.synonyms[0][0].original).toBe('complesso');
    }, { timeout: 2000 });
  });

  it('should reset synonyms when a new text is imported', async () => {
    // 1. Initial state with existing synonyms
    const oldState = {
      text: 'Vecchio testo.',
      sentences: ['Vecchio testo.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      synonyms: { 0: [{ original: 'vecchio', synonym: 'antico' }] }
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(oldState));

    const { getByTitle, getByPlaceholderText, getByText } = render(<ThemeProvider><App /></ThemeProvider>);

    // 2. Go back to input view (it might already be in reader, so click "Nuovo Testo" in header)
    const headerButton = getByTitle(/nuovo testo/i);
    await act(async () => {
      fireEvent.click(headerButton);
    });

    // 3. Import new text
    const textarea = await waitFor(() => getByPlaceholderText(/incolla qui il testo/i));
    const importBtn = getByText(/importa testo/i);

    await act(async () => {
      fireEvent.click(importBtn);
    });
    
    // Check if synonyms were reset
    const saved = JSON.parse(localStorage.getItem('lettura_facile_state') || '{}');
    expect(saved.synonyms).toEqual({});
  });
});
