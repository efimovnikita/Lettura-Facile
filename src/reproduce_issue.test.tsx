import { render, screen } from '@testing-library/react';
import { SentenceDisplay } from './components/SentenceDisplay';
import { vi, describe, it, expect } from 'vitest';

describe('SentenceDisplay Reproduction', () => {
  const defaultProps = {
    sentenceText: "This is a test sentence.",
    displayMode: "original",
    selectedIndices: [],
    getWordIntensity: () => 0,
    onWordClick: () => {},
    isLoading: false,
    synonyms: [],
    showSynonyms: false,
  };

  it('should NOT have landscape-specific height classes yet', () => {
    render(<SentenceDisplay {...defaultProps} />);
    
    const container = screen.getByText("This", { exact: false }).closest('div')?.parentElement;
    // The immediate parent of the motion.div is the one with the min-h classes
    expect(container).toBeInTheDocument();
    
    // Current classes: text-center mb-4 md:mb-12 w-full min-h-[160px] md:min-h-[240px] flex items-center justify-center transition-all duration-300
    // We want to verify it DOES NOT contain landscape:min-h-[45vh]
    expect(container?.className).not.toContain('landscape:min-h-[45vh]');
    expect(container?.className).not.toContain('landscape:overflow-y-auto');
  });
});
