import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './hooks/useTheme';
import * as mistralService from './services/mistral';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  RotateCcw: () => <div data-testid="icon-rotate-ccw" />,
  ClipboardPaste: () => <div data-testid="icon-clipboard-paste" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
  Settings: () => <div data-testid="icon-settings" />,
  BookOpen: () => <div data-testid="icon-book-open" />,
  Sun: () => <div data-testid="icon-sun" />,
  Moon: () => <div data-testid="icon-moon" />,
  Zap: () => <div data-testid="icon-zap" />,
  Theater: () => <div data-testid="icon-theater" />,
  Swords: () => <div data-testid="icon-swords" />,
  CloudRain: () => <div data-testid="icon-cloud-rain" />,
  AlertCircle: () => <div data-testid="icon-alert-circle" />,
  Heart: () => <div data-testid="icon-heart" />,
  Flame: () => <div data-testid="icon-flame" />,
  History: () => <div data-testid="icon-history" />,
  CloudLightning: () => <div data-testid="icon-cloud-lightning" />,
  Loader2: () => <div data-testid="icon-loader2" />,
  ChevronLeft: () => <div data-testid="icon-chevron-left" />,
  ChevronRight: () => <div data-testid="icon-chevron-right" />,
  X: () => <div data-testid="icon-x" />,
  Volume2: () => <div data-testid="icon-volume2" />,
  Square: () => <div data-testid="icon-square" />,
  ExternalLink: () => <div data-testid="icon-external-link" />,
  Plus: () => <div data-testid="icon-plus" />,
  Trash2: () => <div data-testid="icon-trash2" />,
  Languages: () => <div data-testid="icon-languages" />,
  Check: () => <div data-testid="icon-check" />,
  ChevronsUp: () => <div data-testid="icon-chevrons-up" />,
  ChevronsDown: () => <div data-testid="icon-chevrons-down" />,
}));

// Mock Mistral service
vi.mock('./services/mistral', () => ({
  translateWord: vi.fn(),
  translateSentence: vi.fn(),
  simplifySentence: vi.fn(),
  getSentiments: vi.fn().mockResolvedValue([]),
  getSynonyms: vi.fn().mockResolvedValue([]),
  getTextToSpeech: vi.fn().mockResolvedValue('YmFzZTY0'),
}));

// Mock Audio
const mockPlay = vi.fn().mockResolvedValue(undefined);
const mockPause = vi.fn();
const mockLoad = vi.fn();

class MockAudio {
  play = mockPlay;
  pause = mockPause;
  load = mockLoad;
  src = '';
  onended: (() => void) | null = null;
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
}

global.Audio = MockAudio as any;

global.URL.createObjectURL = vi.fn().mockReturnValue('blob:audio');

describe('Listen Button UI', () => {
  beforeEach(() => {
    localStorage.clear();
    const state = {
      text: 'Test sentence.',
      sentences: ['Test sentence.'],
      currentSentenceIndex: 0,
      mistralKey: 'fake-key',
      difficulty: 'original',
    };
    localStorage.setItem('lettura_facile_state', JSON.stringify(state));
    vi.clearAllMocks();
  });

  it('should show the Listen button in original mode', () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    expect(screen.getByLabelText(/ascolta/i)).toBeInTheDocument();
    expect(screen.getByTestId('icon-volume2')).toBeInTheDocument();
  });

  it('should NOT show the Listen button in translated mode', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    const translatedRadio = screen.getByLabelText(/traduzione/i);
    fireEvent.click(translatedRadio);
    
    await waitFor(() => {
      expect(screen.queryByLabelText(/ascolta/i)).toBeNull();
    });
  });

  it('should call getTextToSpeech when the Listen button is clicked', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    const listenButton = screen.getByLabelText(/ascolta/i);
    fireEvent.click(listenButton);
    
    await waitFor(() => {
      expect(mistralService.getTextToSpeech).toHaveBeenCalledWith('fake-key', 'Test sentence.');
    });
  });

  it('should change icon to Square when playing', async () => {
    render(<ThemeProvider><App /></ThemeProvider>);
    
    const listenButton = screen.getByLabelText(/ascolta/i);
    fireEvent.click(listenButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('icon-square')).toBeInTheDocument();
    });
  });
});
