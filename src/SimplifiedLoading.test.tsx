import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as mistral from './services/mistral';
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
  Loader2: ({ className }: { className?: string }) => <div data-testid="icon-loader2" className={className} />,
  ChevronLeft: () => <div data-testid="icon-chevron-left" />,
  ChevronRight: () => <div data-testid="icon-chevron-right" />,
  X: () => <div data-testid="icon-x" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
  ChevronDown: () => <div data-testid="icon-chevron-down" />,
  ChevronUp: () => <div data-testid="icon-chevron-up" />,
  ChevronsUp: () => <div data-testid="icon-chevrons-up" />,
  ChevronsDown: () => <div data-testid="icon-chevrons-down" />,
}));

// Mock Mistral service functions
vi.mock('./services/mistral', () => ({
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn().mockResolvedValue([]),
}));

describe('Simplification Loading Behavior', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'Original sentence.',
      sentences: ['Original sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      difficulty: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
    vi.clearAllMocks();
  });

  it('verifies that sentence text remains visible during simplification loading', async () => {
    // We need a promise that we can control to simulate loading
    let resolveSimplification: (value: string) => void = () => {};
    const simplificationPromise = new Promise<string>((resolve) => {
      resolveSimplification = resolve;
    });

    vi.mocked(mistral.simplifySentence).mockReturnValue(simplificationPromise);

    render(<ThemeProvider><App /></ThemeProvider>);

    // Initial state: Original text is visible
    expect(await screen.findByText('Original')).toBeInTheDocument();
    expect(screen.getByText('sentence')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();

    // Click "Semplificato"
    const simplifyButton = screen.getByLabelText(/semplificato/i);
    fireEvent.click(simplifyButton);

    // NEW BEHAVIOR: 
    // 1. Text remains visible
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('sentence')).toBeInTheDocument();
    
    // 2. We resolve the simplification
    await act(async () => {
      resolveSimplification('Simplified sentence.');
    });

    // 3. New text should appear
    await waitFor(() => {
      expect(screen.getByText('Simplified')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('verifies that simplification failure keeps the original text visible', async () => {
    vi.mocked(mistral.simplifySentence).mockRejectedValue(new Error('AI Error'));

    render(<ThemeProvider><App /></ThemeProvider>);

    // Wait for initial text
    expect(await screen.findByText('Original')).toBeInTheDocument();

    const simplifyButton = screen.getByLabelText(/semplificato/i);
    fireEvent.click(simplifyButton);

    // Should show error and keep original text
    await waitFor(() => {
        expect(screen.getByText(/AI Error/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('sentence')).toBeInTheDocument();
  });
});
