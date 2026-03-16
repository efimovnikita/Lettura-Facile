import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';

// Mock Mistral service to avoid actual API calls
vi.mock('./services/mistral', () => ({
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn().mockResolvedValue([]),
  getSynonyms: vi.fn(),
}));

// Mock utils
vi.mock('./utils', async () => {
  const actual = await vi.importActual('./utils') as any;
  return {
    ...actual,
    loadState: vi.fn().mockReturnValue({
      text: 'Test text.',
      sentences: ['Test text.'],
      currentIndex: 0,
      mistralKey: 'test-key',
      view: 'reader',
      difficulty: 'A1',
      displayMode: 'full',
      sentiments: { 0: { tone: 'neutral', score: 0.9, explanation: 'Neutral text' } },
      synonyms: {}
    }),
  };
});

describe('Compact Emotion Element', () => {
  it('should have reduced vertical footprint for the tone indicator', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const sentimentContainer = screen.getByTestId('tone-indicator-container');
    
    // Check for reduced vertical padding/margins on the container
    // Original: mb-1 lg:mb-2 py-1 md:py-2
    // New Target: mb-0 py-0.5
    expect(sentimentContainer).toHaveClass('mb-0');
    expect(sentimentContainer).toHaveClass('py-0.5');

    // Find the ToneIndicator internal div (it has min-h-[40px] currently)
    // We expect it to have min-h-[20px] or similar compact height
    const indicator = sentimentContainer.firstChild as HTMLElement;
    expect(indicator).toHaveClass('min-h-[20px]');
    expect(indicator).toHaveClass('gap-0');
  });
});
