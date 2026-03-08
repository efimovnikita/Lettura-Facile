# Implementation Plan - Synonym Toggle Stability

This plan addresses the issue where the synonym toggle is active even when no synonyms are available to display (e.g., due to exact match failure with hyphenated words).

## User Review Required

> [!IMPORTANT]
> The toggle will now only be active if an **exact match** is found between the AI-provided "original" word and a word in the current sentence. If words are hyphenated or broken, the toggle will be disabled.

## Proposed Changes

### Logic Improvements (`App.tsx`)
- Implement a helper function `hasMatchingSynonyms(text, synonyms)` that uses the same word cleaning logic as `SentenceDisplay.tsx`.
- Update the `hasSynonyms` prop passed to `ModeSwitch` to use this new logic.

### UI Improvements (`ModeSwitch.tsx`)
- Prevent `onThumbClick` from firing if `hasSynonyms` is false.
- Update styles (cursor and opacity) when `hasSynonyms` is false to clearly indicate it's disabled.

## Verification Plan

### Automated Tests
- **Unit Test for Matching Logic**: Verify that the matching correctly identifies synonyms only when they are exact matches for words in the sentence.
- **Integration Test for Toggle State**:
    - Mock synonyms for a sentence.
    - Render `App`.
    - Verify toggle is enabled for "rassicurò" in "il gigante rassicurò".
    - Verify toggle is disabled for "rassicurò" in "il gigante rass-icurò".
    - Verify clicking a disabled toggle does nothing.

### Manual Verification
1.  **Start App**: `npm run dev`
2.  **Import Text**: Use a sentence with a complex word (e.g., "Il gigante rassicurò subito.").
3.  **Wait for Synonyms**: Ensure the toggle becomes active (colored icons, clickable).
4.  **Import Hyphenated Text**: Use "Il gigante rass-icurò subito.".
5.  **Verify**: Ensure the toggle remains inactive/disabled even if synonyms are in state.

---

## Phases

### Phase 1: Preparation & Testing
- [ ] Task: Create reproduction test case for hyphenated/non-matching synonyms.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Preparation & Testing' (Protocol in workflow.md)

### Phase 2: Implementation - Logic Refactor
- [ ] Task: Implement `hasMatchingSynonyms` utility or logic in `App.tsx`.
- [ ] Task: Update `App.tsx` to pass the correct `hasSynonyms` state to `ModeSwitch`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation - Logic Refactor' (Protocol in workflow.md)

### Phase 3: Implementation - UI/UX Refinement
- [ ] Task: Update `ModeSwitch.tsx` to handle the disabled state correctly.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Implementation - UI/UX Refinement' (Protocol in workflow.md)
