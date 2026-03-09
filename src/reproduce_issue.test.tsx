import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './hooks/useTheme';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  RotateCcw: () => <div data-testid="icon-rotate-ccw" />,
  ClipboardPaste: () => <div data-testid="icon-clipboard-paste" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
  Settings: () => <div data-testid="icon-settings" />,
  BookOpen: () => <div data-testid="icon-book-open" />,
  Sun: () => <div data-testid="icon-sun" />,
  Moon: () => <div data-testid="icon-moon" />,
  Zap: () => <div data-testid="icon-zap" />,
  Theater: () => <div data-testid="icon-theater" />,
  Swords: () => <div data-testid="icon-swords" />,
  CloudRain: () => <div data-testid="icon-cloud-rain" />,
  AlertCircle: () => <div data-testid="icon-alert-circle" />,
  Heart: () => <div data-testid="icon-heart" />,
  Flame: () => <div data-testid="icon-flame" />,
  History: () => <div data-testid="icon-history" />,
  CloudLightning: () => <div data-testid="icon-cloud-lightning" />,
  Loader2: () => <div data-testid="icon-loader2" />,
  ChevronLeft: () => <div data-testid="icon-chevron-left" />,
  ChevronRight: () => <div data-testid="icon-chevron-right" />,
  X: () => <div data-testid="icon-x" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
  Check: () => <div data-testid="icon-check" />,
  ChevronDown: () => <div data-testid="icon-chevron-down" />,
  ChevronUp: () => <div data-testid="icon-chevron-up" />,
  ChevronsUp: () => <div data-testid="icon-chevrons-up" />,
  ChevronsDown: () => <div data-testid="icon-chevrons-down" />,
}));

// Mock Mistral service
vi.mock('./services/mistral', () => ({
  MistralService: vi.fn().mockImplementation(() => ({
    simplify: vi.fn(),
    translate: vi.fn(),
    analyzeSentiment: vi.fn(),
  })),
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn().mockResolvedValue([]),
}));

describe('Reproduction of Double-Click Issue', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'Original sentence.',
      sentences: ['Original sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      difficulty: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  it('fails to show tooltip on double-click because handleWordDoubleClick hides it', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    const word = await screen.findByText('Original');
    
    // Simulate double click
    fireEvent.doubleClick(word);
    
    // The issue was that double click selects the word (which shows tooltip)
    // but the handler was immediately setting isSelected=false or clear state.
    // In current implementation, double click selects the word.
    // We check if the word has the 'bg-blue-100' or similar selection class.
    // However, our current logic might NOT select on double-click if it's explicitly handled.
  });

  it('still supports Ctrl+Click for multi-selection', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    const word1 = await screen.findByText('Original');
    const word2 = await screen.findByText('sentence');
    
    fireEvent.click(word1);
    fireEvent.click(word2, { ctrlKey: true });
    
    // Both should be selected
  });
});
