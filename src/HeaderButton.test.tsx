import { render, screen, within } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './hooks/useTheme';

// Mock Lucide icons
vi.mock('lucide-react', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    RotateCcw: (props: any) => <div data-testid="icon-rotate-ccw" {...props} />,
    Sun: (props: any) => <div data-testid="icon-sun" {...props} />,
    Moon: (props: any) => <div data-testid="icon-moon" {...props} />,
  };
});

describe('Header "Nuovo Testo" Button', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have only the icon and accessibility attributes in the header', () => {
    // Pre-populate state to go directly to reader view
    const state = {
      text: 'First sentence. Second sentence.',
      sentences: ['First sentence.', 'Second sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));

    render(<ThemeProvider><App /></ThemeProvider>);

    const header = screen.getByRole('banner');
    const headerButton = within(header).getByRole('button', { name: /nuovo testo/i });
    
    expect(headerButton).toHaveAttribute('aria-label', 'Nuovo Testo');
    expect(headerButton).toHaveAttribute('title', 'Nuovo Testo');
    
    // Check that the text "Nuovo Testo" is NOT visible in the header button
    // within(headerButton).queryByText will find the text if it's there
    expect(within(headerButton).queryByText(/nuovo testo/i)).toBeNull();
    
    // Check for icon
    expect(within(headerButton).getByTestId('icon-rotate-ccw')).toBeInTheDocument();
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

    render(<ThemeProvider><App /></ThemeProvider>);

    const mainContent = screen.getByRole('main');
    const endButton = within(mainContent).getByRole('button', { name: /nuovo testo/i });
    
    expect(endButton).toHaveTextContent(/nuovo testo/i);
    expect(within(endButton).getByTestId('icon-rotate-ccw')).toBeInTheDocument();
  });
});
