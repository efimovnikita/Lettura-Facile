# Implementation Plan: Mobile Landscape Active Sentence Height Fix

This plan details the steps to optimize the height and scroll behavior of the active sentence block in mobile landscape mode.

## Phase 1: Research and Setup
- [x] Task: Research current implementation of `SentenceDisplay.tsx` and related Tailwind CSS classes. b2c6aaf
- [x] Task: Identify the specific Tailwind CSS classes or media queries used for landscape orientation. b2c6aaf
- [x] Task: Create a reproduction test case to verify the current height issue in mobile landscape simulation. b2c6aaf
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Research and Setup' (Protocol in workflow.md)

## Phase 2: Implementation of Height and Scroll Fix
- [ ] Task: Write failing tests for the new height and internal scrolling behavior in landscape mode.
- [ ] Task: Modify `SentenceDisplay.tsx` (and related components if necessary) to apply `min-h-[45vh]` and `overflow-y-auto` in landscape orientation using Tailwind CSS 4.
- [ ] Task: Ensure the height fix applies correctly to all display modes (Original, Simplified, Translated).
- [ ] Task: Verify that the internal scrollbar (if visible) does not break the layout.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation of Height and Scroll Fix' (Protocol in workflow.md)

## Phase 3: Verification and Finalization
- [ ] Task: Run all tests to ensure no regressions in portrait or desktop layouts.
- [ ] Task: Manually verify the fix in a simulated mobile landscape environment (browser dev tools).
- [ ] Task: Verify that pinned navigation and headers are still fully accessible.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification and Finalization' (Protocol in workflow.md)
