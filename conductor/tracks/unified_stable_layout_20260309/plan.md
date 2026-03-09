# Implementation Plan: Unified Stable Layout for All Screen Sizes

## Phase 1: Preparation & Red Phase (TDD)
- [ ] Task: Update `src/MobileStableLayout.test.tsx` to assert fixed viewport behavior on ALL screen sizes (removing `lg:h-auto` check).
- [ ] Task: Confirm tests fail.

## Phase 2: Green Phase - Unification
- [ ] Task: Update `src/App.tsx` to remove `lg:h-auto` and `lg:overflow-visible` from the main container.
- [ ] Task: Ensure consistent solid backgrounds for fixed areas across all breakpoints.
- [ ] Task: Run tests and confirm they PASS.

## Phase 3: Integration & UX Tuning
- [ ] Task: Verify desktop scrollbars are visible and functional.
- [ ] Task: Verify tooltip/synonym positioning on desktop scrolling.
- [ ] Task: Conductor - User Manual Verification 'Unified Stable Layout' (Protocol in workflow.md)
