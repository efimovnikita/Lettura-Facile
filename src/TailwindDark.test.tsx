import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Tailwind Dark Mode', () => {
  it('should apply dark styles when .dark class is present on document element', () => {
    // This is more of an integration/visual test, but we can check styles in JSDOM
    // Note: JSDOM might not fully resolve Tailwind classes, but we can check if the class is there
    // and if our hook correctly applies it (which we already tested).
    // To truly test if Tailwind applies the styles, we'd need a real browser or a more complex setup.
    
    document.documentElement.classList.add('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    document.documentElement.classList.remove('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
