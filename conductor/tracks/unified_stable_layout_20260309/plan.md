# Implementation Plan: Unified Stable Layout for All Screen Sizes

## Phase 1: Preparation & Red Phase (TDD)
- [x] Task: Update `src/MobileStableLayout.test.tsx` to assert fixed viewport behavior on ALL screen sizes (removing `lg:h-auto` check). [abf0548]
- [x] Task: Confirm tests fail. [abf0548]

## Phase 2: Green Phase - Unification
- [x] Task: Update `src/App.tsx` to remove `lg:h-auto` and `lg:overflow-visible` from the main container. [abf0548]
- [x] Task: Ensure consistent solid backgrounds for fixed areas across all breakpoints. [abf0548]
- [x] Task: Run tests and confirm they PASS. [abf0548]

## Phase 3: Integration & UX Tuning
- [x] Task: Verify desktop scrollbars are visible and functional. [abf0548]
- [x] Task: Verify tooltip/synonym positioning on desktop scrolling. [abf0548]
- [ ] Task: Conductor - User Manual Verification 'Unified Stable Layout' (Protocol in workflow.md)
