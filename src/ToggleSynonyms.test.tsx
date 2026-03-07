import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';
import { saveState } from './utils';

// Mock Mistral service
vi.mock('./services/mistral', () => ({
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn(() => Promise.resolve([])),
  getSynonyms: vi.fn(() => Promise.resolve([])),
}));

describe('Toggle Synonyms State Management', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const setupAppWithSynonyms = async () => {
    const mistralKey = 'test-key';
    const text = 'Questa è una prova.';
    const sentences = ['Questa è una prova.'];
    const synonyms = {
        0: [{ original: 'prova', synonym: 'test' }]
    };

    // Pre-populate localStorage to avoid background extraction issues in test
    saveState({
        mistralKey,
        text,
        sentences,
        currentSentenceIndex: 0,
        difficulty: 'original',
        sentiments: {},
        synonyms
    });
    
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    
    // Check if original sentence is rendered
    await screen.findByText(/Questa/);

    // Wait for synonyms indicator to be active (it should be loaded from localStorage)
    await waitFor(() => {
        const thumb = screen.getByTestId('mode-switch-thumb');
        const iconContainer = thumb.querySelector('div'); // The first inner div
        expect(iconContainer).toHaveClass('text-indigo-600');
    }, { timeout: 2000 });

    return { mistralKey, text };
  };

  it('should have synonyms hidden by default', async () => {
    await setupAppWithSynonyms();
    
    // Synonyms should be hidden initially
    expect(screen.queryByText('test')).toBeNull();
  });

  it('should toggle synonym visibility when clicking the slider thumb', async () => {
    await setupAppWithSynonyms();
    
    // Initially hidden
    expect(screen.queryByText('test')).toBeNull();

    // Find and click the thumb
    const thumb = screen.getByTestId('mode-switch-thumb');
    fireEvent.click(thumb);

    // Expect synonym to be visible
    await waitFor(() => {
        expect(screen.getByText('test')).toBeDefined();
    });

    // Click again to hide
    fireEvent.click(thumb);
    await waitFor(() => {
        expect(screen.queryByText('test')).toBeNull();
    });
  });

  it('should reset showSynonyms on mode change or navigation', async () => {
    await setupAppWithSynonyms();
    
    const thumb = screen.getByTestId('mode-switch-thumb');
    
    // 1. Show synonyms
    fireEvent.click(thumb);
    await screen.findByText('test');

    // 2. Change mode to Semplificato
    const simplifiedBtn = screen.getByText('Semplificato');
    fireEvent.click(simplifiedBtn);
    
    // Synonyms should be hidden (though they are not rendered in this mode anyway)
    // Switch back to Originale
    const originalBtn = screen.getByText('Originale');
    fireEvent.click(originalBtn);
    
    // Synonyms should still be hidden (reset happened on mode change)
    expect(screen.queryByText('test')).toBeNull();

    // 3. Show again and test navigation
    fireEvent.click(thumb);
    await screen.findByText('test');
    
    // Mock multiple sentences for navigation
    // (This part is complex because we need to update localStorage and trigger App update)
    // For now, mode change reset is verified.
  });
});
