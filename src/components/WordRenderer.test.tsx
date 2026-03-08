import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WordRenderer } from './WordRenderer';

describe('WordRenderer', () => {
  const defaultProps = {
    word: 'test',
    index: 0,
    intensity: 0,
    isSelected: false,
    onClick: vi.fn(),
  };

  it('renders a word with responsive spacing class', () => {
    const { container } = render(<WordRenderer {...defaultProps} />);
    const wrapper = container.firstChild as HTMLElement;
    // Current class is mr-1, we want mr-[0.3em]
    expect(wrapper.className).toContain('mr-[0.3em]');
  });

  it('maintains responsive spacing even with synonyms', () => {
    const { container } = render(<WordRenderer {...defaultProps} synonym="test-synonym" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('mr-[0.3em]');
  });
});
