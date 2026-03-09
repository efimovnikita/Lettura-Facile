import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './hooks/useTheme';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  RotateCcw: () => <div data-testid="icon-rotate-ccw" />,
  Settings: () => <div data-testid="icon-settings" />,
  BookOpen: () => <div data-testid="icon-book-open" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
  Sun: () => <div data-testid="icon-sun" />,
  Moon: () => <div data-testid="icon-moon" />,
  Zap: () => <div data-testid="icon-zap" />,
  Heart: () => <div data-testid="icon-heart" />,
  Flame: () => <div data-testid="icon-flame" />,
  History: () => <div data-testid="icon-history" />,
  CloudLightning: () => <div data-testid="icon-cloud-lightning" />,
  Loader2: () => <div data-testid="icon-loader2" />,
  ChevronDown: () => <div data-testid="icon-chevron-down" />,
  ChevronUp: () => <div data-testid="icon-chevron-up" />,
  ChevronsDown: () => <div data-testid="icon-chevrons-down" />,
  ChevronsUp: () => <div data-testid="icon-chevrons-up" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  ClipboardPaste: () => <div data-testid="icon-clipboard-paste" />,
  Languages: () => <div data-testid="icon-languages" />,
  X: () => <div data-testid="icon-x" />,
  Theater: () => <div data-testid="icon-theater" />,
  Swords: () => <div data-testid="icon-swords" />,
  CloudRain: () => <div data-testid="icon-cloud-rain" />,
  AlertCircle: () => <div data-testid="icon-alert-circle" />,
}));

describe('Header Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    
    // Pre-populate state to go directly to reader view
    const state = {
      text: 'Test sentence.',
      sentences: ['Test sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
  });

  it('should render the theme toggle in the header', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const header = screen.getByRole('banner');
    const themeToggle = within(header).getByLabelText(/cambia tema/i);
    expect(themeToggle).toBeInTheDocument();
  });

  it('should toggle theme when clicked in the header', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const header = screen.getByRole('banner');
    const themeToggle = within(header).getByLabelText(/cambia tema/i);

    // Initial state (light)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Toggle to dark
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Toggle back to light
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
