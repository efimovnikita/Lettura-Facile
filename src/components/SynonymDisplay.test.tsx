import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SentenceDisplay } from './SentenceDisplay';

describe('SentenceDisplay with Synonyms', () => {
  const defaultProps = {
    sentenceText: 'Il gatto è sul tavolo',
    displayMode: 'original',
    selectedIndices: [],
    getWordIntensity: () => 0,
    onWordClick: vi.fn(),
    isLoading: false,
  };

  it('renders synonyms when provided for complex words', () => {
    const synonyms = [
      { original: 'tavolo', synonym: 'scrivania' }
    ];

    render(<SentenceDisplay {...defaultProps} synonyms={synonyms} />);
    
    // Check if original word is present
    expect(screen.getByText('tavolo')).toBeDefined();
    
    // Check if synonym is present (in uppercase as per spec)
    const synonymElement = screen.getByText('SCRIVANIA');
    expect(synonymElement).toBeDefined();
    
    // Check for orange color class (using text-orange-500 from Tailwind)
    expect(synonymElement.className).toContain('text-orange-500');
  });
});
