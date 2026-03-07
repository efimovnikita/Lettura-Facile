# Implementation Plan: Toggle Synonyms Visibility

## Phase 1: State Management & Reset Logic
- [x] Task: Write tests for `App.tsx` state and reset logic (TDD)
- [x] Task: Implement `showSynonyms` state in `App.tsx`
- [x] Task: Implement reset logic in `nextSentence`, `prevSentence`, and `setDisplayMode`
- [x] Task: Conductor - User Manual Verification 'Phase 1: State Management' (Protocol in workflow.md)

## Phase 2: Component Updates (ModeSwitch & SentenceDisplay)
- [x] Task: Write tests for `ModeSwitch` thumb click, icon rendering, and `SentenceDisplay` synonym visibility (TDD)
- [x] Task: Update `ModeSwitch` component:
    - [x] Add `onThumbClick`, `hasSynonyms`, and `showSynonyms` props
    - [x] Implement `ChevronsUp`/`ChevronsDown` icon rendering inside the thumb
    - [x] Apply conditional coloring and direction based on `hasSynonyms` and `showSynonyms`
- [x] Task: Update `SentenceDisplay` to accept `showSynonyms` and conditionally pass synonyms to `WordRenderer`
- [x] Task: Update `App.tsx` to connect `ModeSwitch` and `SentenceDisplay` with the new state and props (`hasSynonyms`)
- [x] Task: Conductor - User Manual Verification 'Phase 2: Component Integration' (Protocol in workflow.md)

## Phase 3: Final Verification & Cleanup
- [x] Task: Ensure all tests pass and coverage is >80%
- [x] Task: Run project linting and type checking
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)
