import { render, screen } from '@testing-library/react';
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
  Volume2: () => <div data-testid="icon-volume2" />,
  ExternalLink: () => <div data-testid="icon-external-link" />,
  Plus: () => <div data-testid="icon-plus" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
  Check: () => <div data-testid="icon-check" />,
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
}));

describe('Mobile Landscape Visibility', () => {
  const originalInnerHeight = window.innerHeight;
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'First sentence. Second sentence.',
      sentences: ['First sentence.', 'Second sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  const setViewport = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
    window.dispatchEvent(new Event('resize'));
  };

  afterEach(() => {
    setViewport(originalInnerWidth, originalInnerHeight);
  });

  it('should have navigation buttons within the viewport in landscape mode', () => {
    // Typical landscape mobile viewport (e.g., iPhone 8: 667x375)
    const width = 667;
    const height = 375;
    setViewport(width, height);

    render(<ThemeProvider><App /></ThemeProvider>);

    const nextButton = screen.getByText(/la prossima frase/i).closest('button');
    expect(nextButton).toBeInTheDocument();

    if (nextButton) {
      // In JSDOM, getBoundingClientRect usually returns all 0s unless mocked or using a specific setup.
      // But we want to simulate the failure. 
      // Since JSDOM doesn't do real layout, we might need to mock the height of elements 
      // or check the classes applied.
      
      // Let's check if the button has classes that might push it out.
      // The parent of the buttons is: <div className="z-20 bg-stone-50 dark:bg-stone-950 px-6 pb-6 pt-2">
      // and: <div className="flex flex-col items-center gap-1 lg:gap-6 w-full max-w-4xl mx-auto">
      // and: <div className="flex items-center gap-4 mt-1 lg:mt-8">
      
      // We can also try to mock getBoundingClientRect to simulate layout
      nextButton.getBoundingClientRect = vi.fn(() => ({
        width: 200,
        height: 60,
        top: 380, // Outside the 375 height
        left: 233,
        bottom: 440,
        right: 433,
        x: 233,
        y: 380,
        toJSON: () => {},
      }));

      const rect = nextButton.getBoundingClientRect();
      expect(rect.bottom).toBeLessThanOrEqual(height);
    }
  });
});
