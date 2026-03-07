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

  it('applies padding to accommodate synonyms', () => {
    const { container } = render(<SentenceDisplay {...defaultProps} />);
    const motionDiv = container.querySelector('.font-serif');
    expect(motionDiv?.className).toContain('pt-12');
  });

  it('skips synonyms for adjacent words to avoid overlap', () => {
    const synonyms = [
      { original: 'gatto', synonym: 'felino' },
      { original: 'è', synonym: 'trovasi' }
    ];

    render(<SentenceDisplay {...defaultProps} synonyms={synonyms} />);
    
    // Should show FELINO
    expect(screen.getByText('FELINO')).toBeDefined();
    
    // Should NOT show TROVASI because it's the next word
    expect(screen.queryByText('TROVASI')).toBeNull();
  });
});
