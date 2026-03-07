# Specification: Toggle Synonyms Visibility

## Overview
Currently, synonyms are automatically displayed above complex words when the application is in "Original" mode. This feature introduces a way for users to manually toggle the visibility of these synonyms to test their own vocabulary before seeking help.

## Functional Requirements
1.  **Toggle Trigger:**
    *   The "Slider Thumb" (circular knob) of the `ModeSwitch` component must act as a toggle button when the `currentMode` is set to `original`.
    *   Clicking the thumb while in `original` mode will toggle the visibility of synonyms.
2.  **Default State:**
    *   Synonyms must be **hidden** by default when a new sentence is loaded or when the application is first opened.
3.  **Reset Behavior:**
    *   The `showSynonyms` state must reset to `false` (hidden) whenever:
        *   The user navigates to the next sentence.
        *   The user navigates to the previous sentence.
        *   The user switches between `original`, `simplified`, and `translated` modes.
4.  **UI Feedback:**
    *   The synonyms should appear/disappear with an animated transition (leveraging existing `motion/react` patterns if possible, or simple state-driven conditional rendering).
    *   (Optional but recommended) The slider thumb could provide a subtle visual hint (e.g., color change or icon) when synonyms are active, though the primary request is just the click functionality.

## Technical Requirements
1.  **State Management:**
    *   Introduce `showSynonyms` boolean state in `App.tsx`.
2.  **Component Updates:**
    *   `ModeSwitch.tsx`: Add a click handler to the slider thumb. Pass `onThumbClick` prop from `App.tsx`.
    *   `SentenceDisplay.tsx`: Accept `showSynonyms` prop and use it to conditionally pass `synonym` values to `WordRenderer`.
3.  **Reset Logic:**
    *   Update `nextSentence`, `prevSentence`, and `setDisplayMode` calls to include `setShowSynonyms(false)`.

## Acceptance Criteria
*   [ ] When in "Originale" mode, clicking the slider knob toggles synonyms on/off.
*   [ ] Synonyms are hidden by default when clicking "La prossima frase" or "Nuovo Testo".
*   [ ] Synonyms are hidden by default when switching from "Semplificato" back to "Originale".
*   [ ] The application remains responsive and maintains its clean aesthetic.

## Out of Scope
*   Persisting the `showSynonyms` state in `localStorage`.
*   Toggling synonyms in "Simplified" mode (if synonyms are ever added there).
