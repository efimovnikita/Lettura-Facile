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

describe('Mobile Stable Layout Reproduction Test', () => {
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

  it('should have a fixed viewport and scrollable middle section on mobile (< 1024px)', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    // Check for fixed viewport container
    const header = await screen.findByRole('banner');
    const topFixed = header.parentElement;
    const readerView = topFixed?.parentElement;
    expect(readerView).toHaveClass('lg:h-auto'); // Default should be fluid on desktop
    expect(readerView).toHaveClass('h-[100dvh]');
    expect(readerView).toHaveClass('flex');
    expect(readerView).toHaveClass('flex-col');
    expect(readerView).toHaveClass('overflow-hidden');

    // Check for scrollable main section
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-1');
    expect(main).toHaveClass('overflow-y-auto');
  });

  it('should have fixed top and bottom areas with solid backgrounds on mobile', async () => {
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
});
