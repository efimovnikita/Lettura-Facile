import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SentenceDisplay } from './SentenceDisplay';

describe('SentenceDisplay', () => {
  const defaultProps = {
    sentenceText: 'Test sentence display',
    displayMode: 'original',
    selectedIndices: [],
    getWordIntensity: () => 0,
    onWordClick: vi.fn(),
    onWordDoubleClick: vi.fn(),
    isLoading: false,
  };

  it('renders words of the sentence', () => {
    render(<SentenceDisplay {...defaultProps} />);
    expect(screen.getByText('Test')).toBeDefined();
    expect(screen.getByText('sentence')).toBeDefined();
    expect(screen.getByText('display')).toBeDefined();
  });

  it('calls onWordClick when a word is clicked', () => {
    render(<SentenceDisplay {...defaultProps} />);
    const word = screen.getByText('Test');
    fireEvent.click(word);
    expect(defaultProps.onWordClick).toHaveBeenCalled();
  });

  it('applies loading classes when isLoading is true', () => {
    const { container } = render(<SentenceDisplay {...defaultProps} isLoading={true} />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('opacity-50');
    expect(div.className).toContain('blur-[1px]');
  });
});
