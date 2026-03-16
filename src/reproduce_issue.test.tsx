import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SentenceDisplay } from './components/SentenceDisplay';

describe('SentenceDisplay Landscape Alignment', () => {
  const defaultProps = {
    sentenceText: 'Test sentence display',
    displayMode: 'original',
    selectedIndices: [],
    getWordIntensity: () => 0,
    onWordClick: vi.fn(),
    isLoading: false,
  };

  it('has landscape:items-start class for top alignment in landscape', () => {
    const { container } = render(<SentenceDisplay {...defaultProps} />);
    const div = container.firstChild as HTMLElement;
    
    // This is the core requirement: it should have landscape:items-start
    expect(div.className).toContain('landscape:items-start');
    
    // It should also have items-center for portrait/general (or it might change)
    // In our case, we keep items-center and add landscape:items-start to override it
    expect(div.className).toContain('items-center');
  });
});
