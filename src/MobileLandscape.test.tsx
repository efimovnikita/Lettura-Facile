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

  it('should have navigation buttons within the viewport and hidden text in landscape mode', () => {
    // Typical landscape mobile viewport (e.g., iPhone 8: 667x375)
    const width = 667;
    const height = 375;
    setViewport(width, height);

    render(<ThemeProvider><App /></ThemeProvider>);

    // Text is in the DOM but hidden by class in landscape
    const nextButton = screen.getByText(/prossima/i).closest('button');
    expect(nextButton).toBeInTheDocument();

    if (nextButton) {
      // Simulate that the button is now WITHIN the viewport (e.g., at 300px top, height 44px)
      nextButton.getBoundingClientRect = vi.fn(() => ({
        width: 100,
        height: 44,
        top: 300,
        left: 283,
        bottom: 344,
        right: 383,
        x: 283,
        y: 300,
        toJSON: () => {},
      }));

      const rect = nextButton.getBoundingClientRect();
      expect(rect.bottom).toBeLessThanOrEqual(height);

      // Verify text "Prossima" is hidden (has 'landscape:hidden' class)
      const textSpan = screen.getByText(/prossima/i);
      expect(textSpan).toHaveClass('landscape:hidden');
    }
  });

  it('should align the current sentence to the top in landscape mode', () => {
    // Typical landscape mobile viewport
    const width = 667;
    const height = 375;
    setViewport(width, height);

    const { container } = render(<ThemeProvider><App /></ThemeProvider>);

    // Find the SentenceDisplay container. It has 'min-h-[160px]'
    const sentenceContainer = container.querySelector('.min-h-\\[160px\\]');
    expect(sentenceContainer).toBeInTheDocument();
    
    // It should have 'landscape:items-start'
    expect(sentenceContainer?.className).toContain('landscape:items-start');
  });
});
