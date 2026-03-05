import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';

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
  Volume2: () => <div data-testid="icon-volume2" />,
  ExternalLink: () => <div data-testid="icon-external-link" />,
  Plus: () => <div data-testid="icon-plus" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
  Check: () => <div data-testid="icon-check" />,
}));

const mockTranslateWord = vi.fn().mockResolvedValue('Traduzione');

// Mock Mistral service
vi.mock('./services/mistral', () => ({
  translateWord: (...args: any[]) => mockTranslateWord(...args),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn().mockResolvedValue([]),
}));

describe('Reproduction of Double-Click Issue', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'Test phrase translation.',
      sentences: ['Test phrase translation.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      displayMode: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
    mockTranslateWord.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fails to show tooltip on double-click because handleWordDoubleClick hides it', async () => {
    render(<App />);
    
    // Wait for the reader view to be ready and text to appear
    // We use real timers for the initial setup to avoid useEffect/async issues
    vi.useRealTimers();
    const word = await screen.findByText('phrase');
    
    // Now switch to fake timers for the interaction
    vi.useFakeTimers();
    
    // 1. First click
    fireEvent.click(word);
    vi.advanceTimersByTime(50); // 50ms later

    // 2. Second click (triggers double-tap logic in handleWordClick)
    fireEvent.click(word);
    
    // 3. Browser fires doubleClick event (as it does on desktop)
    fireEvent.doubleClick(word);

    // Now, let's see what happened.
    // In the BROKEN state:
    // - handleWordClick (2nd) sets selection and calls translation.
    // - handleWordDoubleClick clears selection and HIDEs translation.
    
    // Advance timers to allow any promises to resolve
    await vi.runAllTimersAsync();

    // EXPECTATION: The word 'phrase' should be selected.
    // In the BROKEN state, it is selected by handleWordClick and then DESELECTED by handleWordDoubleClick.
    
    // We can check if the word has the selection class.
    // WordRenderer uses selectionClass which has 'bg-blue-200' etc.
    expect(word.className).toContain('bg-blue-200');
  });

  it('still supports Ctrl+Click for multi-selection', async () => {
    const { act: reactAct } = await import('react');
    render(<App />);
    
    vi.useRealTimers();
    const word1 = await screen.findByText('Test');
    const word2 = await screen.findByText('phrase');
    
    vi.useFakeTimers();

    // 1. First click (no Ctrl)
    await reactAct(async () => {
        fireEvent.click(word1);
        vi.advanceTimersByTime(500); 
    });
    
    // Verify first word selected
    expect(word1.className).toContain('bg-blue-200');

    // 2. Ctrl+Click on second word
    await reactAct(async () => {
        fireEvent.click(word2, { ctrlKey: true });
        await vi.runAllTimersAsync();
    });

    // Both should be selected
    expect(word1.className).toContain('bg-blue-200');
    expect(word2.className).toContain('bg-blue-200');
    
    // Translation should be for the phrase
    expect(mockTranslateWord).toHaveBeenCalledWith('fake-key', 'Test phrase', 'Test phrase translation.');
  });
});
