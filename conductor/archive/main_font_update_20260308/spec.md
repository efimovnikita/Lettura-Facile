# Track Specification: Main Screen Font & Spacing Update

## Overview
Improve the readability of the main reading screen by replacing the system serif font with a high-quality web font (Merriweather) and fixing the word-spacing issue where words appear too close to each other.

## Functional Requirements
- **Font Integration:** Integrate the "Merriweather" Google Font into the application.
- **Font Application:** Set "Merriweather" as the primary serif font for the `SentenceDisplay` component.
- **Word Spacing Fix:** Adjust the horizontal margin between words in `WordRenderer` to be proportional to the font size (using `em` units instead of fixed `rem/px`).
- **Responsive Sizing:** Ensure the new font and spacing look correct on both mobile and desktop screens.

## Non-Functional Requirements
- **Readability:** The text must be significantly easier to read at high zoom levels (4xl/5xl).
- **Performance:** Font loading should not significantly delay the initial page render (use `font-display: swap`).

## Acceptance Criteria
- [ ] Words in `SentenceDisplay` have clearly visible gaps (approx. 0.3em).
- [ ] The font for the Italian sentences is "Merriweather".
- [ ] The layout remains stable and does not "jump" during font loading.
- [ ] Mobile view (small screens) remains functional and visually balanced.

## Out of Scope
- Updating fonts for the "Settings" or "Input" views (unless requested later).
- Changing colors or background themes.
