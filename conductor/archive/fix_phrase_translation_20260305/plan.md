# Implementation Plan: Fix Phrase Translation Double-Click Logic

## Phase 1: Research and Reproduction
- [x] Task: Reproduce the issue with a unit test (3e5db63)
- [x] Task: Analyze `App.tsx` click handling (3e5db63)

## Phase 2: Unified Interaction Logic
- [x] Task: Refactor `WordRenderer` to remove `onDoubleClick` (354d1f4)
- [x] Task: Refactor `App.tsx` to unify logic (354d1f4)
- [x] Task: Verify "Ctrl+Click" functionality (354d1f4)

## Phase 3: Verification and Testing
- [x] Task: Update existing tests (354d1f4)
- [x] Task: Final Verification [checkpoint: 354d1f4]
    - [x] Run all tests: `npm test`. (354d1f4)
    - [x] Task: Conductor - User Manual Verification 'Unified Click Logic' (Protocol in workflow.md) (354d1f4)
