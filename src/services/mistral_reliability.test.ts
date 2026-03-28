import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSynonyms, getSentiments, getTextToSpeech } from './mistral';

// Mock the Mistral client
const mockComplete = vi.fn();
const mockSpeechComplete = vi.fn();

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

describe('Mistral Service Reliability - 429 Retry Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should retry getSynonyms when encountering a 429 error and eventually succeed', async () => {
    const error429 = new Error('Too Many Requests');
    (error429 as any).status = 429;
    
    mockComplete
      .mockRejectedValueOnce(error429)
      .mockRejectedValueOnce(error429)
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify({ results: [[{ original: 'test', synonym: 'trial' }]] }) } }]
      });

    const promise = getSynonyms('test-api-key', ['test']);
    
    // Fast-forward through retries
    await vi.runAllTimersAsync();
    
    const result = await promise;
    
    expect(mockComplete).toHaveBeenCalledTimes(3);
    expect(result[0][0].original).toBe('test');
  });

  it('should retry getSentiments when encountering a 429 error and eventually succeed', async () => {
    const error429 = new Error('Too Many Requests');
    (error429 as any).status = 429;
    
    mockComplete
      .mockRejectedValueOnce(error429)
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify({ results: [{ tone: 'neutral', score: 0.5, explanation: 'ok' }] }) } }]
      });

    const promise = getSentiments('test-api-key', ['test']);
    
    await vi.runAllTimersAsync();
    
    const result = await promise;
    
    expect(mockComplete).toHaveBeenCalledTimes(2);
    expect(result[0].tone).toBe('neutral');
  });

  it('should fail after maximum retries', async () => {
    const error429 = new Error('Too Many Requests');
    (error429 as any).status = 429;
    
    // Mock 6 failures (default maxRetries is 5, so 6th call is the last attempt)
    mockComplete.mockRejectedValue(error429);

    const promise = getSynonyms('test-api-key', ['test']);
    
    await vi.runAllTimersAsync();
    
    await expect(promise).rejects.toThrow('Too Many Requests');
    // 1 initial attempt + 5 retries = 6 total calls
    expect(mockComplete).toHaveBeenCalledTimes(6);
  });

  it('should not retry on non-retryable errors (e.g., 401)', async () => {
    const error401 = new Error('Unauthorized');
    (error401 as any).status = 401;
    
    mockComplete.mockRejectedValueOnce(error401);

    const promise = getSynonyms('test-api-key', ['test']);
    
    await expect(promise).rejects.toThrow('Unauthorized');
    expect(mockComplete).toHaveBeenCalledTimes(1);
  });

  it('should retry on transient server errors (e.g., 503)', async () => {
    const error503 = new Error('Service Unavailable');
    (error503 as any).status = 503;
    
    mockComplete
      .mockRejectedValueOnce(error503)
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify({ results: [[{ original: 'test', synonym: 'trial' }]] }) } }]
      });

    const promise = getSynonyms('test-api-key', ['test']);
    
    await vi.runAllTimersAsync();
    
    const result = await promise;
    
    expect(mockComplete).toHaveBeenCalledTimes(2);
    expect(result[0][0].original).toBe('test');
  });

  it('should retry getTextToSpeech when encountering a 429 error and eventually succeed', async () => {
    const error429 = new Error('Too Many Requests');
    (error429 as any).status = 429;
    
    mockSpeechComplete
      .mockRejectedValueOnce(error429)
      .mockResolvedValueOnce({
        audioData: 'YmFzZTY0YXVkaW8='
      });

    const promise = getTextToSpeech('test-api-key', 'Ciao');
    
    await vi.runAllTimersAsync();
    
    const result = await promise;
    
    expect(mockSpeechComplete).toHaveBeenCalledTimes(2);
    expect(result).toBe('YmFzZTY0YXVkaW8=');
  });
});
