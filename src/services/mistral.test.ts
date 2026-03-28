import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSynonyms } from './mistral';

const mockComplete = vi.fn().mockResolvedValue({
  choices: [
    {
      message: {
        content: JSON.stringify({
          results: [
            [{ original: 'complesso', synonym: 'difficile' }],
            []
          ]
        })
      }
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
      chat = {
        complete: mockComplete
      };
      audio = {
        speech: {
          complete: mockSpeechComplete
        }
      };
    }
  };
});

describe('Mistral Service - getSynonyms', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and parse synonyms correctly', async () => {
    const sentences = ['Это сложное предложение.', 'Это простое.'];
    const result = await getSynonyms('test-api-key', sentences);

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(1);
    expect(result[0][0].original).toBe('complesso');
    expect(result[0][0].synonym).toBe('difficile');
    expect(result[1]).toHaveLength(0);
  });

  it('should include CEFR and B1 threshold in the system prompt', async () => {
    const sentences = ['Test sentence'];
    
    await getSynonyms('test-api-key', sentences);

    const call = mockComplete.mock.calls[0][0];
    const systemMessage = call.messages.find((m: any) => m.role === 'system');

    expect(systemMessage.content).toContain('CEFR');
    expect(systemMessage.content).toContain('B1');
  });
});

describe('Mistral Service - getTextToSpeech', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call Mistral TTS API and return the base64 audio data', async () => {
    const { getTextToSpeech } = await import('./mistral');
    const apiKey = 'test-api-key';
    const input = 'Ciao mondo';

    const result = await getTextToSpeech(apiKey, input);

    expect(mockSpeechComplete).toHaveBeenCalledWith({
      model: 'voxtral-mini-tts-2603',
      input,
      responseFormat: 'mp3',
      stream: false,
      voiceId: 'c48524bb-3f27-4fd9-863c-c63c26564b04',
    });
    expect(result).toBe('YmFzZTY0YXVkaW8=');
  });
});
