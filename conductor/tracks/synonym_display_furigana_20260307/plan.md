# Implementation Plan - Furigana-Style Synonym Display (`synonym_display_furigana_20260307`)

## Phase 1: Component Refactoring & Basic Furigana UI
- [ ] Task: Refactor `SentenceDisplay` and `WordRenderer` to support furigana annotations.
    - Update component interfaces to accept synonym data.
    - Ensure synonyms are correctly passed down from `App.tsx` state.
    - **TDD:** Write unit tests for `SentenceDisplay` ensuring it renders `ruby` or equivalent tags when synonyms are present.
- [ ] Task: Implement basic CSS for orange furigana.
    - Create styles for small, orange, all-caps synonym text.
    - Implement the small orange arrow pointing **UP** from the word to the synonym using CSS (e.g., pseudo-elements or SVG).
    - **TDD:** Verify component styles via Vitest/JSDOM (classes applied correctly).
- [ ] Task: Conductor - User Manual Verification 'Component Refactoring & Basic Furigana UI' (Protocol in workflow.md)

## Phase 2: Layout & Spacing
- [ ] Task: Adjust vertical spacing in `SentenceDisplay`.
    - Modify line height and margins to accommodate furigana without overlapping lines above.
    - Ensure the layout remains clean on mobile devices.
    - **TDD:** Verify container height/spacing adjustments in tests.
- [ ] Task: Implement horizontal conflict handling.
    - Add logic to detect if adjacent furigana annotations would overlap.
    - Implement a "skip" or "offset" strategy to maintain readability.
- [ ] Task: Conductor - User Manual Verification 'Layout & Spacing' (Protocol in workflow.md)

## Phase 3: Final Polishing & Reference Alignment
- [ ] Task: Align with Visual Reference.
    - **Note:** Wait for user to provide the visual reference before final styling.
    - Adjust font weights, arrow proportions, and exact orange hue to match reference.
- [ ] Task: Verify Interaction Integrity.
    - Ensure that clicking on a word with a synonym still correctly triggers the dictionary/translation popup.
    - Verify that the synonym text itself does not interfere with touch targets.
- [ ] Task: Conductor - User Manual Verification 'Final Polishing & Reference Alignment' (Protocol in workflow.md)
