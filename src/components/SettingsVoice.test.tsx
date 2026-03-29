import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SettingsPanel } from './SettingsPanel';
import * as mistralService from '../services/mistral';
import { ThemeContext } from '../hooks/useTheme';

// Mock the mistral service
vi.mock('../services/mistral', async () => {
  const actual = await vi.importActual('../services/mistral');
  return {
    ...actual,
    fetchVoices: vi.fn(),
  };
});

describe('SettingsPanel - Voice Selection', () => {
  const mockVoices = [
    { id: 'v1', name: 'Arabella', description: 'Female', example: '' },
    { id: 'v2', name: 'George', description: 'Male', example: '' },
  ];

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
        {ui}
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not show voice selection if mistralKey is empty', () => {
    renderWithTheme(
      <SettingsPanel
        mistralKey=""
        setMistralKey={() => {}}
        dictionary={{}}
        showWordList={false}
        setShowWordList={() => {}}
        clearDictionary={() => {}}
        selectedVoice=""
        setSelectedVoice={() => {}}
        voices={[]}
        voiceError={null}
      />
    );

    expect(screen.queryByLabelText(/Voce/i)).not.toBeInTheDocument();
  });

  it('should show voice selection dropdown when mistralKey is present and voices are loaded', async () => {
    renderWithTheme(
      <SettingsPanel
        mistralKey="valid-key"
        setMistralKey={() => {}}
        dictionary={{}}
        showWordList={false}
        setShowWordList={() => {}}
        clearDictionary={() => {}}
        selectedVoice="v1"
        setSelectedVoice={() => {}}
        voices={mockVoices}
        voiceError={null}
      />
    );

    expect(screen.getByLabelText(/Voce/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('v1');
    expect(screen.getByText(/Arabella/i)).toBeInTheDocument();
    expect(screen.getByText(/George/i)).toBeInTheDocument();
  });

  it('should call setSelectedVoice when a new voice is selected', () => {
    const setSelectedVoice = vi.fn();
    renderWithTheme(
      <SettingsPanel
        mistralKey="valid-key"
        setMistralKey={() => {}}
        dictionary={{}}
        showWordList={false}
        setShowWordList={() => {}}
        clearDictionary={() => {}}
        selectedVoice="v1"
        setSelectedVoice={setSelectedVoice}
        voices={mockVoices}
        voiceError={null}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'v2' } });
    expect(setSelectedVoice).toHaveBeenCalledWith('v2');
  });

  it('should show an error message if voices fail to load', () => {
     renderWithTheme(
      <SettingsPanel
        mistralKey="valid-key"
        setMistralKey={() => {}}
        dictionary={{}}
        showWordList={false}
        setShowWordList={() => {}}
        clearDictionary={() => {}}
        selectedVoice=""
        setSelectedVoice={() => {}}
        voices={[]}
        voiceError="Could not load voices"
      />
    );

    expect(screen.getByText(/Could not load voices/i)).toBeInTheDocument();
  });

  it('should not crash if voices prop is undefined', () => {
    renderWithTheme(
      <SettingsPanel
        mistralKey="valid-key"
        setMistralKey={() => {}}
        dictionary={{}}
        showWordList={false}
        setShowWordList={() => {}}
        clearDictionary={() => {}}
        selectedVoice=""
        setSelectedVoice={() => {}}
        voices={undefined as any}
        voiceError={null}
      />
    );

    expect(screen.getByText(/Caricamento voci/i)).toBeInTheDocument();
  });
});
