import { describe, it, expect, vi, beforeEach } from 'vitest';
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

describe('Mistral Service Reliability - 429 Error', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fail when getSynonyms encounters a 429 error', async () => {
    // Mock 429 Error (Too Many Requests)
    // The Mistral SDK typically throws an error for non-2xx responses.
    // I'll simulate a generic error that looks like a 429.
    const error429 = new Error('Too Many Requests');
    (error429 as any).status = 429;
    mockComplete.mockRejectedValueOnce(error429);

    await expect(getSynonyms('test-api-key', ['Test sentence'])).rejects.toThrow('Too Many Requests');
  });

  it('should fail when getSentiments encounters a 429 error', async () => {
    const error429 = new Error('Too Many Requests');
    (error429 as any).status = 429;
    mockComplete.mockRejectedValueOnce(error429);

    await expect(getSentiments('test-api-key', ['Test sentence'])).rejects.toThrow('Too Many Requests');
  });
});
