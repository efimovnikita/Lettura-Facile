# Implementation Plan: Smooth Sentence Mode Transitions

## Phase 1: Setup and Component Extraction
- [ ] Task: Extract Sentence Display into a separate component `SentenceDisplay.tsx`
    - [ ] Create `src/components/SentenceDisplay.tsx`
    - [ ] Update `App.tsx` to use `SentenceDisplay`
    - [ ] Ensure all existing functionality remains intact
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Component Extraction' (Protocol in workflow.md)

## Phase 2: Animation Integration (TDD)
- [ ] Task: Write tests for `SentenceDisplay` animations
    - [ ] Create `src/components/SentenceDisplay.test.tsx`
    - [ ] Verify that the component uses `motion.div` and `AnimatePresence`
    - [ ] Verify that it supports a loading state
- [ ] Task: Implement animations in `SentenceDisplay.tsx`
    - [ ] Wrap content in `AnimatePresence`
    - [ ] Add cross-fade transitions (`opacity`) between content changes
    - [ ] Implement smooth height morphing using `layout`
    - [ ] Set transition duration to 0.2s (Snappy)
    - [ ] Implement "Keep Old Content" visual style (opacity/blur) during loading
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Animation Integration' (Protocol in workflow.md)

## Phase 3: Final Verification and Cleanup
- [ ] Task: Verify overall app behavior and performance
    - [ ] Ensure no regressions in word selection or translation logic
    - [ ] Check performance on mobile devices (if possible)
    - [ ] Verify that coverage is >80% for new code
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)
