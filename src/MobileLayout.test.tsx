import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { SentenceDisplay } from './components/SentenceDisplay';

// Mock Mistral service to avoid network calls
vi.mock('./services/mistral', () => ({
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn().mockResolvedValue([]),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  RotateCcw: () => <div data-testid="icon-rotate-ccw" />,
  ClipboardPaste: () => <div data-testid="icon-clipboard-paste" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
  Settings: () => <div data-testid="icon-settings" />,
  BookOpen: () => <div data-testid="icon-book-open" />,
  Sun: () => <div data-testid="icon-sun" />,
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
  X: () => <div data-testid="icon-x" />,
  ChevronDown: () => <div data-testid="icon-chevron-down" />,
  ChevronUp: () => <div data-testid="icon-chevron-up" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
}));

describe('Mobile Layout Spacing', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'Test sentence.',
      sentences: ['Test sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  describe('Reader View Margins (App.tsx)', () => {
    it('should verify reader view main container padding', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      // Current: pt-8 md:pt-16
      // Future: pt-4 md:pt-16
      expect(main?.className).toContain('pt-8');
      expect(main?.className).toContain('md:pt-16');
    });

    it('should verify reader view header margin', () => {
      const { container } = render(<App />);
      const header = container.querySelector('header');
      // Current: mb-8 md:mb-12
      // Future: mb-4 md:mb-12
      expect(header?.className).toContain('mb-8');
      expect(header?.className).toContain('md:mb-12');
    });

    it('should verify sentence display area margin', () => {
      // SentenceDisplay is rendered inside App, let's find it by its testid or class
      // In App.tsx: <SentenceDisplay ... /> is rendered. 
      // Actually, SentenceDisplay doesn't have its own margin in its component, 
      // it's likely applied in App.tsx or SentenceDisplay.tsx.
      // Looking at App.tsx: SentenceDisplay doesn't have margin class passed to it.
      // But looking at SentenceDisplay.tsx: it has mb-12.
    });
  });

  describe('SentenceDisplay Height (SentenceDisplay.tsx)', () => {
    it('should verify sentence display minimum height', () => {
      const { container } = render(
        <SentenceDisplay
          sentenceText="Test"
          displayMode="original"
          selectedIndices={[]}
          getWordIntensity={() => 0}
          onWordClick={() => {}}
        />
      );
      const div = container.firstChild as HTMLElement;
      // Current: min-h-[240px]
      // Future: min-h-[160px] md:min-h-[240px]
      expect(div.className).toContain('min-h-[240px]');
    });
  });
});
