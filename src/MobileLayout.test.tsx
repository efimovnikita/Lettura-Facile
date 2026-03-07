import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Mistral service
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

describe('Responsive Layout Verification', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'Test sentence.',
      sentences: ['Test sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      difficulty: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  describe('Mobile Classes (Responsive)', () => {
    it('should have mobile-specific classes', async () => {
      render(<App />);
      
      const main = await screen.findByRole('main');
      // On mobile (default viewport in jsdom usually), it should have pt-4 or similar
      expect(main).toHaveClass('pt-4');
    });

    it('should have responsive min-height on SentenceDisplay', async () => {
      render(<App />);
      // We check for the container of SentenceDisplay
      // Based on code: min-h-[160px] md:min-h-[240px]
      const sentenceContainer = (await screen.findByText('Test')).parentElement?.parentElement?.parentElement;
      expect(sentenceContainer).toHaveClass('min-h-[160px]');
    });
  });

  describe('Desktop Classes (Responsive)', () => {
    it('should preserve desktop-specific classes', async () => {
      render(<App />);
      const main = await screen.findByRole('main');
      expect(main).toHaveClass('md:pt-16');
    });

    it('should preserve desktop min-height on SentenceDisplay', async () => {
      render(<App />);
      const sentenceContainer = (await screen.findByText('Test')).parentElement?.parentElement?.parentElement;
      expect(sentenceContainer).toHaveClass('md:min-h-[240px]');
    });
  });
});
