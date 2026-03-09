import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSynonyms, getSentiments } from './mistral';

// Mock the Mistral client
const mockComplete = vi.fn();

vi.mock('@mistralai/mistralai', () => {
  return {
    Mistral: class {
      chat = {
        complete: mockComplete
      }
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

  it('should not retry on non-429 errors', async () => {
    const error500 = new Error('Internal Server Error');
    (error500 as any).status = 500;
    
    mockComplete.mockRejectedValueOnce(error500);

    const promise = getSynonyms('test-api-key', ['test']);
    
    await expect(promise).rejects.toThrow('Internal Server Error');
    expect(mockComplete).toHaveBeenCalledTimes(1);
  });
});
