import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModeSwitch } from './ModeSwitch';
import '@testing-library/jest-dom';

describe('ModeSwitch Labels and Icons Cleanup', () => {
  it('should NOT contain visible text labels Originale, Semplificato, or Traduzione', () => {
    const onChange = vi.fn();
    render(
      <ModeSwitch 
        currentMode="original" 
        onChange={onChange} 
      />
    );
    
    expect(screen.queryByText(/Originale/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Semplificato/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Traduzione/i)).not.toBeInTheDocument();
  });

  it('should have accessible labels on the track targets', () => {
    const onChange = vi.fn();
    render(
      <ModeSwitch 
        currentMode="original" 
        onChange={onChange} 
      />
    );
    
    // In my latest write_file, I used <div> for click targets with aria-label
    expect(screen.getByLabelText(/Originale/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Semplificato/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Traduzione/i)).toBeInTheDocument();
  });
});
