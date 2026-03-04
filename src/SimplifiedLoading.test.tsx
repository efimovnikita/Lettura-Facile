import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as mistral from './services/mistral';

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
  Loader2: ({ className }: { className?: string }) => <div data-testid="icon-loader2" className={className} />,
  ChevronLeft: () => <div data-testid="icon-chevron-left" />,
  ChevronRight: () => <div data-testid="icon-chevron-right" />,
  X: () => <div data-testid="icon-x" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
  ChevronDown: () => <div data-testid="icon-chevron-down" />,
  ChevronUp: () => <div data-testid="icon-chevron-up" />,
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
    let resolveSimplification: (value: string) => void;
    const simplificationPromise = new Promise<string>((resolve) => {
      resolveSimplification = resolve;
    });

    vi.mocked(mistral.simplifySentence).mockReturnValue(simplificationPromise);

    render(<App />);

    // Initial state: Original text is visible
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('sentence')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();

    // Click "Semplificato"
    const simplifyButton = screen.getByText(/semplificato/i);
    fireEvent.click(simplifyButton);

    // NEW BEHAVIOR: 
    // 1. Text remains visible
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('sentence')).toBeInTheDocument();
    
    // 2. Loading indicator should be present (on the button)
    await waitFor(() => {
        expect(screen.getByTestId('icon-loader2')).toBeInTheDocument();
    });
    
    // 3. The full-page spinner should NOT be present in the main sentence area
    // In our mock, icon-loader2 is used for both. We check if it's inside the button.
    const buttonWithSpinner = screen.getByRole('button', { name: /semplificato/i });
    expect(buttonWithSpinner.querySelector('[data-testid="icon-loader2"]')).toBeInTheDocument();
  });

  it('verifies that simplification failure keeps the original text visible', async () => {
    vi.mocked(mistral.simplifySentence).mockRejectedValue(new Error('AI Error'));

    render(<App />);

    const simplifyButton = screen.getByText(/semplificato/i);
    fireEvent.click(simplifyButton);

    // Should show error and keep original text
    await waitFor(() => {
        expect(screen.getByText(/AI Error/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('sentence')).toBeInTheDocument();
  });
});
