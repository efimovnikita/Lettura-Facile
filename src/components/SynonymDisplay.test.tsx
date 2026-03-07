import { render, screen, fireEvent } from '@testing-library/react';
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
    showSynonyms: true,
  };

  it('renders synonyms when provided for complex words', () => {
    const synonyms = [
      { original: 'tavolo', synonym: 'scrivania' }
    ];

    render(<SentenceDisplay {...defaultProps} synonyms={synonyms} />);
    
    // Check if original word is present
    expect(screen.getByText('tavolo')).toBeDefined();
    
    // Check if synonym is present (in lowercase as per latest request)
    const synonymElement = screen.getByText('scrivania');
    expect(synonymElement).toBeDefined();
    
    // Check for orange color class (using text-orange-500 from Tailwind)
    expect(synonymElement.className).toContain('text-orange-500');
  });

  it('applies padding to accommodate synonyms', () => {
    const { container } = render(<SentenceDisplay {...defaultProps} />);
    const motionDiv = container.querySelector('.font-serif');
    expect(motionDiv?.className).toContain('pt-6');
  });

  it('skips synonyms for adjacent words to avoid overlap', () => {
    const synonyms = [
      { original: 'gatto', synonym: 'felino' },
      { original: 'è', synonym: 'trovasi' }
    ];

    render(<SentenceDisplay {...defaultProps} synonyms={synonyms} />);
    
    // Should show felino
    expect(screen.getByText('felino')).toBeDefined();
    
    // Should NOT show trovasi because it's the next word
    expect(screen.queryByText('trovasi')).toBeNull();
  });

  it('maintains click interaction on words with synonyms', () => {
    const synonyms = [{ original: 'gatto', synonym: 'felino' }];
    render(<SentenceDisplay {...defaultProps} synonyms={synonyms} />);
    
    const word = screen.getByText('gatto');
    fireEvent.click(word);
    
    expect(defaultProps.onWordClick).toHaveBeenCalled();
  });
});
