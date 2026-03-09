# Implementation Plan: Mobile/Tablet UI Spacing Optimization

## Phase 1: Preparation and Red Phase (TDD)
- [ ] Task: Create `src/MobileSpacingOptimization.test.tsx` to define current vs desired spacing.
- [ ] Task: Implement tests for mobile/tablet spacing (< 1024px) that expect:
    - Header: `mb-1`
    - Main: `pt-1`
    - ToneIndicator: `mb-1`
    - Controls (ModeSwitch) Container: `gap-1`
    - Navigation Buttons Container: `mt-1`
- [ ] Task: Implement tests for desktop spacing (>= 1024px) that expect:
    - Header: `lg:mb-12`
    - Main: `lg:pt-16`
    - ToneIndicator: `lg:mb-10`
    - Controls (ModeSwitch) Container: `lg:gap-6`
    - Navigation Buttons Container: `lg:mt-8`
- [ ] Task: Run tests and confirm they FAIL.

## Phase 2: Green Phase - Implementation
- [ ] Task: Update `src/App.tsx` header section spacing.
- [ ] Task: Update `src/App.tsx` main container top spacing.
- [ ] Task: Update `src/App.tsx` ToneIndicator (Sentiment Barometer) bottom spacing.
- [ ] Task: Update `src/App.tsx` Controls container gap.
- [ ] Task: Update `src/App.tsx` Navigation buttons top margin.
- [ ] Task: Run tests and confirm they PASS.

## Phase 3: Verification and Clean-up
- [ ] Task: Run `src/MobileLayout.test.tsx` and update it if necessary (as it might expect old `pt-4` etc.).
- [ ] Task: Conductor - User Manual Verification 'Mobile/Tablet UI Spacing Optimization' (Protocol in workflow.md)
- [ ] Task: Remove `src/MobileSpacingOptimization.test.tsx` (optional) or merge into `src/MobileLayout.test.tsx`.
