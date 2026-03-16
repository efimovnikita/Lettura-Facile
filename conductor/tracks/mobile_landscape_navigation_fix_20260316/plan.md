# Implementation Plan: Mobile Landscape Navigation Fix

## Objective
Ensure the "Previous Sentence" and "Next Sentence" buttons are visible and accessible in landscape orientation on mobile devices by optimizing the vertical space usage.

## Key Files & Context
- `src/App.tsx`: Contains the main layout and the "Bottom Fixed Area" with navigation controls.
- `src/index.css`: Defines global styles and potentially custom scroll behavior.

## Phase 1: Research and Reproduction [checkpoint: 0aaeb96]
- [x] Task: Create a reproduction test in `src/MobileLandscape.test.tsx` that sets the viewport to a landscape aspect ratio (e.g., 667x375 for iPhone 8) and asserts that the navigation buttons are within the visible viewport. 76506c6
- [x] Task: Conductor - User Manual Verification 'Phase 1: Research and Reproduction' (Protocol in workflow.md) aa2b667

## Phase 2: Implementation (Layout Optimization)
- [ ] Task: Implement `landscape:` Tailwind modifiers in `src/App.tsx` to reduce vertical padding and gaps in the "Bottom Fixed Area".
    - Reduce `pb-6 pt-2` to `pb-2 pt-1` in landscape.
    - Reduce gap between `ModeSwitch` and navigation buttons (`gap-1 lg:gap-6` and `mt-1 lg:mt-8`).
- [ ] Task: Consider switching the navigation buttons from `flex-col` to `flex-row` or side-by-side layout in landscape to save height.
- [ ] Task: Ensure the "Next Sentence" button text ("La prossima frase") doesn't cause overflow; consider using only an icon in landscape if necessary.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation (Layout Optimization)' (Protocol in workflow.md)

## Phase 3: Final Verification and Quality Gates
- [ ] Task: Run `npm test` to ensure all tests pass, including the new landscape visibility test.
- [ ] Task: Verify that touch targets for the buttons remain at least 44x44px.
- [ ] Task: Check for regressions in portrait mode.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification and Quality Gates' (Protocol in workflow.md)
