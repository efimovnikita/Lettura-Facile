# Implementation Plan: Mobile Landscape Vertical Alignment Fix

## Phase 1: Research & Reproduction [checkpoint: 408197e]
- [x] Task: Identify the component and CSS classes responsible for the current sentence display.
- [x] Task: Create a reproduction test case that simulates mobile landscape orientation and asserts the current (centered) vertical alignment.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Research & Reproduction' (Protocol in workflow.md) 408197e

## Phase 2: Implementation (TDD)
- [ ] Task: Write failing tests for top-alignment in landscape mode.
    - [ ] Sub-task: Define a test case in `src/MobileLandscape.test.tsx` (or similar) that checks for `items-start` or equivalent vertical alignment when the screen is in landscape.
- [ ] Task: Implement the alignment fix in the target component (likely `SentenceDisplay.tsx`).
    - [ ] Sub-task: Apply responsive Tailwind classes (e.g., `landscape:items-start` or container-specific classes) to align content to the top.
    - [ ] Sub-task: Ensure that standard padding/margins are respected or removed as per the "Top Edge" requirement.
- [ ] Task: Verify the fix with tests.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation (TDD)' (Protocol in workflow.md)

## Phase 3: Verification & Cleanup
- [ ] Task: Manually verify the fix in various simulated devices (iPhone, iPad) using the browser's developer tools.
- [ ] Task: Ensure no regressions in portrait mode or other screen sizes.
- [ ] Task: Run full test suite and check coverage.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification & Cleanup' (Protocol in workflow.md)
