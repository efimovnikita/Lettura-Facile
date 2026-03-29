import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SettingsPanel } from './SettingsPanel';
import { ThemeProvider } from '../hooks/useTheme';
import React from 'react';

describe('SettingsPanel', () => {
  const defaultProps = {
    mistralKey: '',
    setMistralKey: vi.fn(),
    dictionary: {},
    showWordList: false,
    setShowWordList: vi.fn(),
    clearDictionary: vi.fn(),
    selectedVoice: 'v1',
    setSelectedVoice: vi.fn(),
    voices: [],
    voiceError: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders API key input and theme toggle', () => {
    renderWithProvider(<SettingsPanel {...defaultProps} />);
    
    expect(screen.getByText('Configurazione')).toBeDefined();
    expect(screen.getByPlaceholderText('Inserisci la tua API Key...')).toBeDefined();
    expect(screen.getByText('Tema')).toBeDefined();
  });

  it('updates API key when typing', () => {
    const setMistralKey = vi.fn();
    renderWithProvider(<SettingsPanel {...defaultProps} setMistralKey={setMistralKey} />);
    
    const input = screen.getByPlaceholderText('Inserisci la tua API Key...');
    fireEvent.change(input, { target: { value: 'new-key' } });
    
    expect(setMistralKey).toHaveBeenCalledWith('new-key');
  });

  it('toggles theme when switch is clicked', () => {
    renderWithProvider(<SettingsPanel {...defaultProps} />);
    
    const toggle = screen.getByLabelText('Cambia tema');
    
    // Initial state (light)
    expect(localStorage.getItem('theme')).toBe('light');
    
    // Toggle to dark
    fireEvent.click(toggle);
    expect(localStorage.getItem('theme')).toBe('dark');
    
    // Toggle back to light
    fireEvent.click(toggle);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('shows dictionary section when roots are present', () => {
    const dictionary = { 'test': 5, 'other': 2 };
    renderWithProvider(<SettingsPanel {...defaultProps} dictionary={dictionary} />);
    
    expect(screen.getByText(/Radici in memoria:/)).toBeDefined();
    expect(screen.getByText('2')).toBeDefined(); // Object.keys(dictionary).length
  });

  it('calls clearDictionary when button is clicked', () => {
    const clearDictionary = vi.fn();
    const dictionary = { 'test': 5 };
    renderWithProvider(<SettingsPanel {...defaultProps} dictionary={dictionary} clearDictionary={clearDictionary} />);
    
    fireEvent.click(screen.getByText('Svuota dizionario'));
    expect(clearDictionary).toHaveBeenCalled();
  });

  it('toggles word list visibility', () => {
    const setShowWordList = vi.fn();
    const dictionary = { 'test': 5 };
    renderWithProvider(<SettingsPanel {...defaultProps} dictionary={dictionary} setShowWordList={setShowWordList} />);
    
    fireEvent.click(screen.getByText(/Radici in memoria:/));
    expect(setShowWordList).toHaveBeenCalled();
  });
});
