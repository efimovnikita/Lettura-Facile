# Implementation Plan: Toggle Synonyms Visibility

## Phase 1: State Management & Reset Logic
- [ ] Task: Write tests for `App.tsx` state and reset logic (TDD)
- [ ] Task: Implement `showSynonyms` state in `App.tsx`
- [ ] Task: Implement reset logic in `nextSentence`, `prevSentence`, and `setDisplayMode`
- [ ] Task: Conductor - User Manual Verification 'Phase 1: State Management' (Protocol in workflow.md)

## Phase 2: Component Updates (ModeSwitch & SentenceDisplay)
- [ ] Task: Write tests for `ModeSwitch` thumb click, icon rendering, and `SentenceDisplay` synonym visibility (TDD)
- [ ] Task: Update `ModeSwitch` component:
    - [ ] Add `onThumbClick`, `hasSynonyms`, and `showSynonyms` props
    - [ ] Implement `ChevronsUp`/`ChevronsDown` icon rendering inside the thumb
    - [ ] Apply conditional coloring and direction based on `hasSynonyms` and `showSynonyms`
- [ ] Task: Update `SentenceDisplay` to accept `showSynonyms` and conditionally pass synonyms to `WordRenderer`
- [ ] Task: Update `App.tsx` to connect `ModeSwitch` and `SentenceDisplay` with the new state and props (`hasSynonyms`)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Component Integration' (Protocol in workflow.md)

## Phase 3: Final Verification & Cleanup
- [ ] Task: Ensure all tests pass and coverage is >80%
- [ ] Task: Run project linting and type checking
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)
