import { render, screen, fireEvent } from '@testing-library/react';
import { ModeSwitch } from './ModeSwitch';
import { describe, it, expect, vi } from 'vitest';

describe('ModeSwitch Component', () => {
  const onChange = vi.fn();

  it('renders all three modes', () => {
    render(<ModeSwitch currentMode="original" onChange={onChange} />);
    expect(screen.getByText(/originale/i)).toBeInTheDocument();
    expect(screen.getByText(/semplificato/i)).toBeInTheDocument();
    expect(screen.getByText(/traduzione/i)).toBeInTheDocument();
  });

  it('calls onChange when a mode is clicked', () => {
    render(<ModeSwitch currentMode="original" onChange={onChange} />);
    fireEvent.click(screen.getByText(/semplificato/i));
    expect(onChange).toHaveBeenCalledWith('simplified');
    
    fireEvent.click(screen.getByText(/traduzione/i));
    expect(onChange).toHaveBeenCalledWith('translated');
  });

  it('highlights the current mode', () => {
    const { rerender } = render(<ModeSwitch currentMode="original" onChange={onChange} />);
    // Check for indigo text color (ignoring exact shade to be flexible with dark mode)
    expect(screen.getByText(/originale/i).closest('button')).toHaveClass('text-indigo-600');
    
    rerender(<ModeSwitch currentMode="simplified" onChange={onChange} />);
    expect(screen.getByText(/semplificato/i).closest('button')).toHaveClass('text-indigo-600');
  });
});
