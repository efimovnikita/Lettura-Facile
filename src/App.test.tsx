import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Lucide icons to avoid potential issues
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
  Volume2: () => <div data-testid="icon-volume2" />,
  ExternalLink: () => <div data-testid="icon-external-link" />,
  Plus: () => <div data-testid="icon-plus" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
  Check: () => <div data-testid="icon-check" />,
}));

// Mock Mistral service
vi.mock('./services/mistral', () => ({
  MistralService: vi.fn().mockImplementation(() => ({
    simplify: vi.fn(),
    translate: vi.fn(),
    analyzeSentiment: vi.fn(),
  })),
}));

describe('App Component - Difficulty Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    // Pre-populate state to go directly to reader view
    const state = {
      text: 'Test sentence.',
      sentences: ['Test sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      difficulty: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  it('should NOT show Beginner, Intermediate, and Advanced difficulty buttons', () => {
    render(<App />);
    
    // These should NOT be found in the document after implementation
    // Currently, they SHOULD be found, so this test will fail if I expect them NOT to be there.
    expect(screen.queryByText(/beginner/i)).toBeNull();
    expect(screen.queryByText(/intermediate/i)).toBeNull();
    expect(screen.queryByText(/advanced/i)).toBeNull();
  });

  it('should show Originale and Semplificato buttons', () => {
    render(<App />);
    expect(screen.getByText(/originale/i)).toBeInTheDocument();
    expect(screen.getByText(/semplificato/i)).toBeInTheDocument();
  });
});
