import { describe, it, expect } from 'vitest';
import { splitIntoSentences } from './utils';

describe('splitIntoSentences - Italian Direct Speech', () => {
  it('should treat speech + attribution as a single sentence', () => {
    const text = '– Perché la mia nuova fiamma, la Bronty, mi ha fatto una soffiata clamorosa – disse sogghignando.';
    const result = splitIntoSentences(text);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(text);
  });

  it('should split multiple sentences within a single dialogue line', () => {
    const text = '– Un TESORO, baby! Il T-Rex nasconde un tesoro nella sua tana.';
    const result = splitIntoSentences(text);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('– Un TESORO, baby!');
    expect(result[1]).toBe('Il T-Rex nasconde un tesoro nella sua tana.');
  });

  it('should handle dialogue with attributions and terminal punctuation', () => {
    const text = 'Bess si stiracchiò la coda con studiata nonchalance. – Perché la mia nuova fiamma, la Bronty, mi ha fatto una soffiata clamorosa – disse sogghignando dietro gli occhiali da sole.';
    const result = splitIntoSentences(text);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('Bess si stiracchiò la coda con studiata nonchalance.');
    expect(result[1]).toBe('– Perché la mia nuova fiamma, la Bronty, mi ha fatto una soffiata clamorosa – disse sogghignando dietro gli occhiali da sole.');
  });

  it('should split dialogue at newlines', () => {
    const text = '– Che tipo di soffiata?\n– Un TESORO, baby!';
    const result = splitIntoSentences(text);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('– Che tipo di soffiata?');
    expect(result[1]).toBe('– Un TESORO, baby!');
  });

  it('should handle attribution with dash and lowercase', () => {
    const text = '«Я иду», — сказал он.'; // Russian example from spec to ensure general handling
    const result = splitIntoSentences(text);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(text);
  });
});
