import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchVoices, getTextToSpeech } from './mistral';

const mockVoicesComplete = vi.fn().mockResolvedValue({
  voices: [
    {
      id: "c48524bb-3f27-4fd9-863c-c63c26564b04",
      name: "Arabella",
      description: "Female, clear",
      example: "https://example.com/arabella.mp3"
    },
    {
      id: "00000000-0000-0000-0000-000000000000",
      name: "George",
      description: "Male, deep",
      example: "https://example.com/george.mp3"
    }
  ]
});

const mockSpeechComplete = vi.fn().mockResolvedValue({
  audioData: 'YmFzZTY0YXVkaW8=' // 'base64audio' in base64
});

// Mock the Mistral client
vi.mock('@mistralai/mistralai', () => {
  return {
    Mistral: class {
      audio = {
        voices: {
          list: mockVoicesComplete
        },
        speech: {
          complete: mockSpeechComplete
        }
      };
    }
  };
});

describe('Mistral Service - fetchVoices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch the list of available voices from Mistral API', async () => {
    const apiKey = 'test-api-key';
    const voices = await fetchVoices(apiKey);

    expect(mockVoicesComplete).toHaveBeenCalled();
    expect(voices).toHaveLength(2);
    expect(voices[0].name).toBe('Arabella');
    expect(voices[1].name).toBe('George');
  });

  it('should handle errors when fetching voices', async () => {
    mockVoicesComplete.mockRejectedValueOnce(new Error('API Error'));
    const apiKey = 'test-api-key';
    
    await expect(fetchVoices(apiKey)).rejects.toThrow('API Error');
  });
});

describe('Mistral Service - getTextToSpeech with voice_id', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should use the provided voice_id in the TTS request', async () => {
    const apiKey = 'test-api-key';
    const input = 'Ciao mondo';
    const voiceId = '00000000-0000-0000-0000-000000000000';

    await getTextToSpeech(apiKey, input, voiceId);

    expect(mockSpeechComplete).toHaveBeenCalledWith(expect.objectContaining({
      voiceId: voiceId,
    }));
  });

  it('should fallback to default voice_id if none is provided', async () => {
    const apiKey = 'test-api-key';
    const input = 'Ciao mondo';

    await getTextToSpeech(apiKey, input);

    expect(mockSpeechComplete).toHaveBeenCalledWith(expect.objectContaining({
      voiceId: 'c48524bb-3f27-4fd9-863c-c63c26564b04', // Default voice
    }));
  });
});
