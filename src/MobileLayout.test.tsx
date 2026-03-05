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
    it('should have responsive top padding on main container', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      expect(main?.className).toContain('pt-4');
      expect(main?.className).toContain('md:pt-16');
    });

    it('should have responsive header margin', () => {
      const { container } = render(<App />);
      const header = container.querySelector('header');
      expect(header?.className).toContain('mb-4');
      expect(header?.className).toContain('md:mb-12');
    });

    it('should have responsive sentence display margin', () => {
        const { container } = render(<App />);
        // We will update SentenceDisplay.tsx to use responsive mb
        const sentenceArea = container.querySelector('.text-center'); 
        expect(sentenceArea?.className).toContain('mb-6');
        expect(sentenceArea?.className).toContain('md:mb-12');
    });

    it('should have responsive tone indicator margin', () => {
        const { container } = render(<App />);
        const toneContainer = container.querySelector('.sticky.top-0');
        expect(toneContainer?.className).toContain('mb-4');
        expect(toneContainer?.className).toContain('md:mb-10');
    });

    it('should have responsive bottom padding on main container', () => {
        const { container } = render(<App />);
        const main = container.querySelector('main');
        expect(main?.className).toContain('pb-10');
        expect(main?.className).toContain('md:pb-20');
    });
  });

  describe('SentenceDisplay Height (SentenceDisplay.tsx)', () => {
    it('should have responsive minimum height', () => {
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
      expect(div.className).toContain('min-h-[160px]');
      expect(div.className).toContain('md:min-h-[240px]');
    });
  });
});
