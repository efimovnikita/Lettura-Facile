# Implementation Plan: Show Original Sentence During Simplification Loading

This plan outlines the steps to display the original sentence while the simplified version is loading, including a loading indicator on the simplification button.

## Phase 1: Preparation and Test Setup
- [ ] Task: Create reproduction/baseline tests for simplification loading state.
    - [ ] Create `src/SimplifiedLoading.test.tsx`.
    - [ ] Write a test that verifies `isSentenceLoading` currently hides the sentence text.
    - [ ] Write a test that verifies the "Semplificato" button doesn't currently show a spinner.

## Phase 2: Implementation of Loading State Improvements
- [ ] Task: Modify `App.tsx` to maintain original text during simplification.
    - [ ] Update `fetchSentenceVersion` to avoid clearing or hiding the current text when switching to `simplified`.
    - [ ] Ensure that if simplification fails, the original text remains.
- [ ] Task: Update Reader UI for persistent text display.
    - [ ] Remove the full-section spinner in the "Sentence Display" area.
    - [ ] Ensure `WordRenderer` components are rendered even when `isSentenceLoading` is true.
- [ ] Task: Add spinner to "Semplificato" button.
    - [ ] Update the difficulty selection buttons to include a `Loader2` icon when `isSentenceLoading` is true and `difficulty === 'simplified'`.
    - [ ] Style the spinner to be small and adjacent to the button text.

## Phase 3: Verification and Quality Assurance
- [ ] Task: Update tests to verify new behavior.
    - [ ] Update `src/SimplifiedLoading.test.tsx` to assert that text remains visible during loading.
    - [ ] Assert that the spinner is visible on the button during loading.
- [ ] Task: Conductor - User Manual Verification 'Show Original Sentence During Simplification Loading' (Protocol in workflow.md)
