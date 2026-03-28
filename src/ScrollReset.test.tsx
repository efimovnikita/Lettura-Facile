import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './hooks/useTheme';

// Mock Mistral service to avoid real API calls
vi.mock('./services/mistral', () => ({
  simplifySentence: vi.fn().mockResolvedValue('Simplified sentence.'),
  translateSentence: vi.fn().mockResolvedValue('Translated sentence.'),
  getSentiments: vi.fn().mockResolvedValue([]),
  getSynonyms: vi.fn().mockResolvedValue({}),
  translateWord: vi.fn().mockResolvedValue('Translated word.'),
}));

describe('Scroll Reset Logic', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'This is a very long sentence that should ideally cause scrolling in a small container. Let us add more text to be sure. One more time for good measure.',
      sentences: ['This is a very long sentence that should ideally cause scrolling in a small container. Let us add more text to be sure. One more time for good measure.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
    
    // Mock scrollTo since JSDOM doesn't implement it
    Element.prototype.scrollTo = vi.fn();
  });

  it('should reset scrollTop to 0 when display mode changes', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    // Find the scrollable container
    const main = screen.getByRole('main');
    
    // Manually set scrollTop to simulate user scrolling
    Object.defineProperty(main, 'scrollTop', { value: 100, writable: true });
    expect(main.scrollTop).toBe(100);

    // Change mode to "Semplificato"
    const simplifiedBtn = screen.getByLabelText(/semplificato/i);
    await act(async () => {
      fireEvent.click(simplifiedBtn);
    });

    // Check if scrollTop was reset to 0
    // Note: The implementation currently only resets on next/prev, NOT on mode change.
    // So this test should FAIL initially.
    expect(main.scrollTop).toBe(0);
  });

  it('should reset scrollTop to 0 when moving to the next sentence', async () => {
    const state = {
      text: 'First sentence. Second sentence.',
      sentences: ['First sentence.', 'Second sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));

    render(<ThemeProvider><App /></ThemeProvider>);
    
    const main = screen.getByRole('main');
    Object.defineProperty(main, 'scrollTop', { value: 100, writable: true });
    
    const nextBtn = screen.getByText(/prossima/i);
    await act(async () => {
      fireEvent.click(nextBtn);
    });

    // This should PASS as it's already implemented in nextSentence()
    expect(main.scrollTop).toBe(0);
  });
});
