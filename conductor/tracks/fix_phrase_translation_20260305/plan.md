# Implementation Plan: Fix Phrase Translation Double-Click Logic

## Phase 1: Research and Reproduction
- [ ] Task: Reproduce the issue with a unit test
    - [ ] Create `src/reproduce_issue.test.tsx` (or similar).
    - [ ] Simulate a double-click on a word in desktop mode (firing two `click` events and one `doubleClick` event).
    - [ ] Verify that the tooltip is incorrectly hidden or the selection is toggled back.
- [ ] Task: Analyze `App.tsx` click handling
    - [ ] Confirm that `handleWordDoubleClick` is indeed conflicting with the double-tap logic in `handleWordClick`.

## Phase 2: Unified Interaction Logic
- [ ] Task: Refactor `WordRenderer` to remove `onDoubleClick`
    - [ ] Remove `onDoubleClick` prop and event handler from `WordRenderer.tsx`.
    - [ ] Update `SentenceDisplay.tsx` to remove the prop passing.
- [ ] Task: Refactor `App.tsx` to unify logic
    - [ ] Remove `handleWordDoubleClick` from `App.tsx`.
    - [ ] Ensure `handleWordClick` handles both single-click (with delay) and "double-click" (immediate multi-selection and translation) for both mobile and desktop.
    - [ ] Ensure `event.preventDefault()` or similar is used if needed to prevent browser text selection during double-clicks on desktop.
- [ ] Task: Verify "Ctrl+Click" functionality
    - [ ] Ensure desktop "Ctrl+Click" still works for multi-selection.

## Phase 3: Verification and Testing
- [ ] Task: Update existing tests
    - [ ] Update `src/components/WordRenderer.test.tsx` and `src/components/SentenceDisplay.test.tsx` if they rely on `onDoubleClick`.
- [ ] Task: Final Verification
    - [ ] Run all tests: `npm test`.
    - [ ] Task: Conductor - User Manual Verification 'Unified Click Logic' (Protocol in workflow.md)
