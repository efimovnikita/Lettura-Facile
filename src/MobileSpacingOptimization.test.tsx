import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './hooks/useTheme';

// Mock Mistral service
vi.mock('./services/mistral', () => ({
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn().mockResolvedValue([]),
  getSynonyms: vi.fn().mockResolvedValue([]),
}));

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

describe('Mobile/Tablet Spacing Optimization', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'First sentence. Second sentence.',
      sentences: ['First sentence.', 'Second sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      difficulty: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  it('should have optimized mobile/tablet spacing (< 1024px)', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    // Header
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('mb-1');

    // Main
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-1');
    expect(main).toHaveClass('overflow-y-auto');

    // ToneIndicator container (sticky one)
    const sentimentContainer = screen.getByTestId('tone-indicator-container');
    expect(sentimentContainer).toHaveClass('mb-0');
    expect(sentimentContainer).toHaveClass('py-0.5');

    // Controls container (parent of ModeSwitch)
    // ModeSwitch is inside a div with flex flex-col items-center gap-0 lg:gap-2 w-full max-w-4xl mx-auto
    const controlsContainer = screen.getByTestId('mode-switch').parentElement;
    expect(controlsContainer).toHaveClass('gap-0');

    // Navigation buttons container
    // Buttons are inside a div with flex items-center gap-4 mt-0 lg:mt-2
    const buttonsContainer = screen.getByRole('button', { name: /La prossima frase/i }).parentElement;
    expect(buttonsContainer).toHaveClass('mt-0');
  });

  it('should preserve desktop spacing (>= 1024px)', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    // Header
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('lg:mb-4');

    // Main
    const main = screen.getByRole('main');
    const content = main.firstElementChild;
    expect(content).toHaveClass('lg:pt-4');

    // ToneIndicator container
    const sentimentContainer = screen.getByTestId('tone-indicator-container');
    expect(sentimentContainer).toHaveClass('lg:mb-1');

    // Controls container
    const controlsContainer = screen.getByTestId('mode-switch').parentElement;
    expect(controlsContainer).toHaveClass('lg:gap-2');

    // Navigation buttons container
    const buttonsContainer = screen.getByRole('button', { name: /La prossima frase/i }).parentElement;
    expect(buttonsContainer).toHaveClass('lg:mt-2');
  });
});
