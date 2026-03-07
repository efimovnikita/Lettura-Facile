# Track: Furigana-Style Synonym Display

## Overview
This track implements the visual representation of synonyms above "complex" words in the original sentence view. These synonyms, already extracted in the background and stored in `AppState.synonyms`, will be displayed using a Japanese furigana-style layout (ruby annotations).

## Functional Requirements
1.  **Always On Display:** Synonyms for complex words should be automatically displayed whenever the original sentence is shown and synonym data is available.
2.  **Visual Representation (Furigana):**
    -   **Position:** Above the original word.
    -   **Font:** Small font size, uppercase (all-caps).
    -   **Color:** Orange (both for text and the arrow).
    -   **Indicator:** A small orange arrow pointing **UP** from the original word towards its synonym.
    -   **Reference:** A visual reference will be provided by the user during implementation.
3.  **Non-Interactive Annotations:** The synonym text itself is purely informational and not clickable/interactive. The underlying word remains interactive for translation/dictionary as before.
4.  **Layout & Spacing:**
    -   The `SentenceDisplay` must provide enough vertical line height to prevent the furigana from overlapping with the line above.
    -   **Conflict Handling:** If synonyms from adjacent words would horizontally overlap, the implementation should skip or adjust them to maintain readability.

## Non-Functional Requirements
-   **Mobile-First UX:** The layout must be clear and readable on small screens.
-   **Style Consistency:** Ensure the orange styling integrates well with the existing neutral/clean theme.

## Acceptance Criteria
-   [ ] Complex words in the original sentence display a small, orange, uppercase synonym above them.
-   [ ] A small orange arrow points **UP** from the original word to the synonym.
-   [ ] Line spacing in the `SentenceDisplay` adjusts automatically to accommodate the annotations.
-   [ ] Unit/integration tests verify that synonyms are correctly mapped to their respective words.
-   [ ] Visual check: The final layout matches the user-provided reference.

## Out of Scope
-   Toggling the visibility of synonyms (to be implemented in a future track).
-   Interactive synonyms (clicking the synonym to get a translation).
-   Multiple synonyms per word (only the first/primary synonym is displayed).
