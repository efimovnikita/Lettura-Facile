# Implementation Plan: Smooth Sentence Mode Transitions

## Phase 1: Setup and Component Extraction [checkpoint: 6d4afac]
- [x] Task: Extract Sentence Display into a separate component `SentenceDisplay.tsx` (3d909fd)
    - [ ] Create `src/components/SentenceDisplay.tsx`
    - [ ] Update `App.tsx` to use `SentenceDisplay`
    - [ ] Ensure all existing functionality remains intact
- [x] Task: Conductor - User Manual Verification 'Phase 1: Component Extraction' (Protocol in workflow.md) (manual)

## Phase 2: Animation Integration (TDD) [checkpoint: 94ab6b4]
- [x] Task: Write tests for `SentenceDisplay` animations (94ab6b4)
    - [x] Create `src/components/SentenceDisplay.test.tsx`
    - [x] Verify that the component uses `motion.div` and `AnimatePresence`
    - [x] Verify that it supports a loading state
- [x] Task: Implement animations in `SentenceDisplay.tsx` (94ab6b4)
    - [x] Wrap content in `AnimatePresence`
    - [x] Add cross-fade transitions (`opacity`) between content changes
    - [x] Implement smooth height morphing using `layout` (Attempted, but removed to fix double-click; kept snappy feel with opacity)
    - [x] Set transition duration to 0.2s (Snappy)
    - [x] Implement "Keep Old Content" visual style (opacity/blur) during loading
- [x] Task: Conductor - User Manual Verification 'Phase 2: Animation Integration' (Protocol in workflow.md) (manual)

## Phase 3: Final Verification and Cleanup [checkpoint: final]
- [x] Task: Verify overall app behavior and performance (manual)
    - [x] Ensure no regressions in word selection or translation logic
    - [x] Check performance on mobile devices (if possible)
    - [x] Verify that coverage is >80% for new code (SentenceDisplay.tsx is 100%)
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md) (manual)
