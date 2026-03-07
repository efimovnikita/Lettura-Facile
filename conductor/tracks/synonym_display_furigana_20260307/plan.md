# Implementation Plan - Furigana-Style Synonym Display (`synonym_display_furigana_20260307`)

## Phase 1: Component Refactoring & Basic Furigana UI [checkpoint: cffd89d]
- [x] Task: Refactor `SentenceDisplay` and `WordRenderer` to support furigana annotations. (b91c767)
    - Update component interfaces to accept synonym data.
    - Ensure synonyms are correctly passed down from `App.tsx` state.
    - **TDD:** Write unit tests for `SentenceDisplay` ensuring it renders `ruby` or equivalent tags when synonyms are present.
- [x] Task: Implement basic CSS for orange furigana. (963962c)
    - Create styles for small, orange, all-caps synonym text.
    - Implement the small orange arrow pointing **UP** from the word to the synonym using CSS (e.g., pseudo-elements or SVG).
    - **TDD:** Verify component styles via Vitest/JSDOM (classes applied correctly).
- [x] Task: Conductor - User Manual Verification 'Component Refactoring & Basic Furigana UI' (Protocol in workflow.md) (cffd89d)

## Phase 2: Layout & Spacing [checkpoint: 12765a9]
- [x] Task: Adjust vertical spacing in `SentenceDisplay`. (82338d1)
    - Modify line height and margins to accommodate furigana without overlapping lines above.
    - Ensure the layout remains clean on mobile devices.
    - **TDD:** Verify container height/spacing adjustments in tests.
- [x] Task: Implement horizontal conflict handling. (3d13e6f)
    - Add logic to detect if adjacent furigana annotations would overlap.
    - Implement a "skip" or "offset" strategy to maintain readability.
- [x] Task: Conductor - User Manual Verification 'Layout & Spacing' (Protocol in workflow.md) (12765a9)

## Phase 3: Final Polishing & Reference Alignment [checkpoint: 375f876]
- [x] Task: Align with Visual Reference. (f68a6cf)
    - **Note:** Wait for user to provide the visual reference before final styling.
    - Adjust font weights, arrow proportions, and exact orange hue to match reference.
- [x] Task: Verify Interaction Integrity. (9c0c4dd)
    - Ensure that clicking on a word with a synonym still correctly triggers the dictionary/translation popup.
    - Verify that the synonym text itself does not interfere with touch targets.
- [x] Task: Conductor - User Manual Verification 'Final Polishing & Reference Alignment' (Protocol in workflow.md) (375f876)
