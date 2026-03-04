# Implementation Plan: Show Original Sentence During Simplification Loading

This plan outlines the steps to display the original sentence while the simplified version is loading, including a loading indicator on the simplification button.

## Phase 1: Preparation and Test Setup
- [x] Task: Create reproduction/baseline tests for simplification loading state. [8756140]
    - [x] Create `src/SimplifiedLoading.test.tsx`.
    - [x] Write a test that verifies `isSentenceLoading` currently hides the sentence text.
    - [x] Write a test that verifies the "Semplificato" button doesn't currently show a spinner.

## Phase 2: Implementation of Loading State Improvements
- [x] Task: Modify `App.tsx` to maintain original text during simplification. [8756140]
    - [x] Update `fetchSentenceVersion` to avoid clearing or hiding the current text when switching to `simplified`.
    - [x] Ensure that if simplification fails, the original text remains.
- [x] Task: Update Reader UI for persistent text display. [8756140]
    - [x] Remove the full-section spinner in the "Sentence Display" area.
    - [x] Ensure `WordRenderer` components are rendered even when `isSentenceLoading` is true.
- [x] Task: Add spinner to "Semplificato" button. [8756140]
    - [x] Update the difficulty selection buttons to include a `Loader2` icon when `isSentenceLoading` is true and `difficulty === 'simplified'`.
    - [x] Style the spinner to be small and adjacent to the button text.

## Phase 3: Verification and Quality Assurance
- [x] Task: Update tests to verify new behavior. [8756140]
    - [x] Update `src/SimplifiedLoading.test.tsx` to assert that text remains visible during loading.
    - [x] Assert that the spinner is visible on the button during loading.
- [~] Task: Conductor - User Manual Verification 'Show Original Sentence During Simplification Loading' (Protocol in workflow.md)
