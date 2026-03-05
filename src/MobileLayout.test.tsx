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

describe('Mobile Layout Spacing (Failing Phase)', () => {
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
    it('should have reduced top padding on mobile', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      // Should be pt-4 for mobile
      expect(main?.className).toContain('pt-4');
    });

    it('should have reduced header margin on mobile', () => {
      const { container } = render(<App />);
      const header = container.querySelector('header');
      // Should be mb-4 for mobile
      expect(header?.className).toContain('mb-4');
    });

    it('should have reduced sentence display margin on mobile', () => {
        // This is applied in App.tsx on the SentenceDisplay container or component
        // Current: mb-12. Future: mb-6 md:mb-12
        const { container } = render(<App />);
        // SentenceDisplay has mb-12 internally, but we want App to control it or update SentenceDisplay.
        // Let's check SentenceDisplay's own class.
        const sentenceArea = container.querySelector('.text-center.mb-12'); 
        expect(sentenceArea?.className).toContain('mb-6');
    });

    it('should have reduced tone indicator margin on mobile', () => {
        const { container } = render(<App />);
        // <div className="mb-10 sticky ...">
        const toneContainer = container.querySelector('.sticky.top-0');
        expect(toneContainer?.className).toContain('mb-4');
    });

    it('should have reduced bottom padding on mobile', () => {
        const { container } = render(<App />);
        const main = container.querySelector('main');
        expect(main?.className).toContain('pb-10');
    });
  });

  describe('SentenceDisplay Height (SentenceDisplay.tsx)', () => {
    it('should have reduced minimum height on mobile', () => {
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
      // Should be min-h-[160px] for mobile
      expect(div.className).toContain('min-h-[160px]');
    });
  });
});
