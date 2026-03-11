# Implementation Plan: Scroll Text Area to Top on Mode Switch [checkpoint: 6a7afd5]

## Phase 1: Research and Setup
- [x] Task: Identify the text display container in `SentenceDisplay.tsx` and `App.tsx` [6a7afd5]
- [x] Task: Research the best way to trigger scroll reset in React (e.g., `useRef` and `useEffect`) [6a7afd5]

## Phase 2: Implementation (TDD)
- [x] Task: Write Failing Tests for Scroll Reset on Mode Switch [6a7afd5]
    - [x] Create `src/ScrollReset.test.tsx`
    - [x] Mock `window.scrollTo` or element `scrollTo`
    - [x] Verify that changing the mode triggers a scroll reset to top
- [x] Task: Implement Scroll Reset on Mode Switch [6a7afd5]
    - [x] Update `SentenceDisplay.tsx` or `App.tsx` to include a ref for the scrollable container
    - [x] Use `useEffect` to trigger `scrollTo(0, 0)` when the `mode` or `sentence` changes
- [x] Task: Verify and Refactor [6a7afd5]
    - [x] Run tests and ensure they pass
    - [x] Ensure the scroll is "instant" as specified

## Phase 3: Verification
- [x] Task: Conductor - User Manual Verification 'Scroll Reset' (Protocol in workflow.md) [6a7afd5]
