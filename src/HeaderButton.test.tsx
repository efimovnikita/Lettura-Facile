import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  RotateCcw: () => <div data-testid="icon-rotate-ccw" />,
  Settings: () => <div data-testid="icon-settings" />,
  BookOpen: () => <div data-testid="icon-book-open" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
  Zap: () => <div data-testid="icon-zap" />,
  Loader2: () => <div data-testid="icon-loader2" />,
  Heart: () => <div data-testid="icon-heart" />,
  History: () => <div data-testid="icon-history" />,
  CloudRain: () => <div data-testid="icon-cloud-rain" />,
  AlertCircle: () => <div data-testid="icon-alert-circle" />,
  Swords: () => <div data-testid="icon-swords" />,
  Theater: () => <div data-testid="icon-theater" />,
  Flame: () => <div data-testid="icon-flame" />,
  CloudLightning: () => <div data-testid="icon-cloud-lightning" />,
  ClipboardPaste: () => <div data-testid="icon-clipboard-paste" />,
  Languages: () => <div data-testid="icon-languages" />,
  X: () => <div data-testid="icon-x" />,
}));

describe('Header "Nuovo Testo" Button', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have only the icon and accessibility attributes in the header (RED phase)', () => {
    // Pre-populate state to go directly to reader view
    const state = {
      text: 'First sentence. Second sentence.',
      sentences: ['First sentence.', 'Second sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));

    render(<App />);

    // Find the button in the header. 
    // Currently it has text "Nuovo Testo", so getByText should find it.
    // After implementation, getByText should FAIL for the header button.
    
    const header = screen.getByRole('banner');
    const headerButton = screen.getByRole('button', { name: /nuovo testo/i });
    
    expect(header).toContainElement(headerButton);
    
    // These will FAIL currently because they haven't been added yet
    expect(headerButton).toHaveAttribute('aria-label', 'Nuovo Testo');
    expect(headerButton).toHaveAttribute('title', 'Nuovo Testo');
    
    // This will FAIL currently because the text "Nuovo Testo" IS present
    const buttonText = screen.queryByText((content, element) => {
        return element?.tagName.toLowerCase() === 'button' && content.includes('Nuovo Testo') && header.contains(element);
    });
    expect(buttonText).toBeNull();
  });

  it('should still show text in the "Nuovo Testo" button at the end of the text', () => {
    // Pre-populate state to be at the LAST sentence
    const state = {
      text: 'Only sentence.',
      sentences: ['Only sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));

    render(<App />);

    // The button at the end of the text should still have the visible text
    const mainContent = screen.getByRole('main');
    const endButton = screen.getByRole('button', { name: /nuovo testo/i });
    
    expect(mainContent).toContainElement(endButton);
    expect(endButton).toHaveTextContent(/nuovo testo/i);
  });
});
