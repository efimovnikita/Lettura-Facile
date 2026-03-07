import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSynonyms } from './mistral';

// Mock the Mistral client
vi.mock('@mistralai/mistralai', () => {
  return {
    Mistral: class {
      chat = {
        complete: vi.fn().mockResolvedValue({
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
        })
      }
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
});
