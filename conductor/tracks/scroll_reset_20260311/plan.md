# Implementation Plan: Scroll Text Area to Top on Mode Switch

## Phase 1: Research and Setup
- [ ] Task: Identify the text display container in `SentenceDisplay.tsx` and `App.tsx`
- [ ] Task: Research the best way to trigger scroll reset in React (e.g., `useRef` and `useEffect`)

## Phase 2: Implementation (TDD)
- [ ] Task: Write Failing Tests for Scroll Reset on Mode Switch
    - [ ] Create `src/ScrollReset.test.tsx`
    - [ ] Mock `window.scrollTo` or element `scrollTo`
    - [ ] Verify that changing the mode triggers a scroll reset to top
- [ ] Task: Implement Scroll Reset on Mode Switch
    - [ ] Update `SentenceDisplay.tsx` or `App.tsx` to include a ref for the scrollable container
    - [ ] Use `useEffect` to trigger `scrollTo(0, 0)` when the `mode` or `sentence` changes
- [ ] Task: Verify and Refactor
    - [ ] Run tests and ensure they pass
    - [ ] Ensure the scroll is "instant" as specified

## Phase 3: Verification
- [ ] Task: Conductor - User Manual Verification 'Scroll Reset' (Protocol in workflow.md)
