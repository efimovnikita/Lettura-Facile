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

describe('Responsive Layout Verification', () => {
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

  describe('Mobile Classes (Responsive)', () => {
    it('should have mobile-specific classes', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const header = container.querySelector('header');
      const sentenceArea = container.querySelector('.text-center');
      const toneContainer = container.querySelector('.sticky.top-0');
      const controls = container.querySelector('.flex-col.items-center.gap-3');
      const nav = container.querySelector('.mt-4');

      expect(main?.className).toContain('pt-4');
      expect(main?.className).toContain('pb-10');
      expect(header?.className).toContain('mb-4');
      expect(sentenceArea?.className).toContain('mb-4');
      expect(toneContainer?.className).toContain('mb-2');
      expect(toneContainer?.className).toContain('py-1');
      expect(controls?.className).toContain('gap-3');
      expect(nav?.className).toContain('mt-4');
    });

    it('should have responsive min-height on SentenceDisplay', () => {
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
    });
  });

  describe('Desktop Classes (Responsive)', () => {
    it('should preserve desktop-specific classes', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const header = container.querySelector('header');
      const sentenceArea = container.querySelector('.text-center');
      const toneContainer = container.querySelector('.sticky.top-0');
      const controls = container.querySelector('.flex-col.items-center.gap-3');
      const nav = container.querySelector('.mt-4');

      expect(main?.className).toContain('md:pt-16');
      expect(main?.className).toContain('md:pb-20');
      expect(header?.className).toContain('md:mb-12');
      expect(sentenceArea?.className).toContain('md:mb-12');
      expect(toneContainer?.className).toContain('md:mb-10');
      expect(toneContainer?.className).toContain('md:py-2');
      expect(controls?.className).toContain('md:gap-6');
      expect(nav?.className).toContain('md:mt-8');
    });

    it('should preserve desktop min-height on SentenceDisplay', () => {
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
        expect(div.className).toContain('md:min-h-[240px]');
    });
  });
});
