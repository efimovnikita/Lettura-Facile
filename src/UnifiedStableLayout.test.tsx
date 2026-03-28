import { render, screen, within } from '@testing-library/react';
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
  Volume2: () => <div data-testid="icon-volume2" />,
  Square: () => <div data-testid="icon-square" />,
}));

describe('Unified Stable Layout Test', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'Sentence one. Sentence two.',
      sentences: ['Sentence one.', 'Sentence two.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      difficulty: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  it('should have a fixed viewport and scrollable middle section on ALL devices', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    // Check for fixed viewport container
    const header = await screen.findByRole('banner');
    const topFixed = header.parentElement;
    const readerView = topFixed?.parentElement;
    
    expect(readerView).toHaveClass('h-[100dvh]');
    expect(readerView).not.toHaveClass('lg:h-auto');
    expect(readerView).toHaveClass('flex');
    expect(readerView).toHaveClass('flex-col');
    expect(readerView).toHaveClass('overflow-hidden');
    expect(readerView).not.toHaveClass('lg:overflow-visible');

    // Check for scrollable main section
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-1');
    expect(main).toHaveClass('overflow-y-auto');
  });

  it('should have fixed top and bottom areas with solid backgrounds', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    const header = screen.getByRole('banner');
    const footer = screen.getByTestId('mode-switch').parentElement;
    
    // Check for top fixed area
    const topFixed = header.parentElement;
    expect(topFixed).toHaveClass('bg-stone-50');
    expect(topFixed).toHaveClass('dark:bg-stone-950');
    expect(topFixed).toHaveClass('z-20');

    // Check for bottom fixed area
    const bottomFixed = footer.parentElement;
    expect(bottomFixed).toHaveClass('bg-stone-50');
    expect(bottomFixed).toHaveClass('dark:bg-stone-950');
    expect(bottomFixed).toHaveClass('z-20');
  });

  it('should calculate tooltip position correctly when scrolled', async () => {
    // This test targets the logic in performTranslation
    render(<ThemeProvider><App /></ThemeProvider>);
    
    // Find the word "Sentence" - it's inside a span
    const firstWord = await screen.findByText('Sentence');
    
    // Mock getBoundingClientRect for the word
    const wordRect = {
      top: 200,
      left: 100,
      width: 50,
      height: 20,
      bottom: 220,
      right: 150
    };
    firstWord.getBoundingClientRect = vi.fn().mockReturnValue(wordRect);
    
    // Mock getBoundingClientRect and scrollTop for the container (main)
    const main = screen.getByRole('main');
    const containerRect = {
      top: 50,
      left: 0,
      width: 800,
      height: 600,
      bottom: 650,
      right: 800
    };
    main.getBoundingClientRect = vi.fn().mockReturnValue(containerRect);
    
    // Simulate scroll
    Object.defineProperty(main, 'scrollTop', { value: 100, writable: true });
    
    // Click the word
    firstWord.click();
    
    // Wait for tooltip (it might be loading)
    // The tooltip should appear at relativeTop - 10 (since 200 - 50 > 100, placement is 'top')
    // relativeTop = rect.top - containerRect.top + scrollTop = 200 - 50 + 100 = 250
    // expected top = 250 - 10 = 240
    
    const tooltipX = await screen.findByTestId('icon-x');
    const tooltipContainer = tooltipX.closest('.absolute.z-20') as HTMLElement;
    
    expect(tooltipContainer?.style.top).toBe('240px');
  });
});
