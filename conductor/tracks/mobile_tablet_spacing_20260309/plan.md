# Implementation Plan: Mobile/Tablet UI Spacing Optimization

## Phase 1: Preparation and Red Phase (TDD)
- [x] Task: Create `src/MobileSpacingOptimization.test.tsx` to define current vs desired spacing. [ec58d5f]
- [x] Task: Implement tests for mobile/tablet spacing (< 1024px) that expect: [ec58d5f]
    - Header: `mb-1`
    - Main: `pt-1`
    - ToneIndicator: `mb-1`
    - Controls (ModeSwitch) Container: `gap-1`
    - Navigation Buttons Container: `mt-1`
- [x] Task: Implement tests for desktop spacing (>= 1024px) that expect: [ec58d5f]
    - Header: `lg:mb-12`
    - Main: `lg:pt-16`
    - ToneIndicator: `lg:mb-10`
    - Controls (ModeSwitch) Container: `lg:gap-6`
    - Navigation Buttons Container: `lg:mt-8`
- [x] Task: Run tests and confirm they FAIL. [ec58d5f]

## Phase 2: Green Phase - Implementation
- [x] Task: Update `src/App.tsx` header section spacing. [ec58d5f]
- [x] Task: Update `src/App.tsx` main container top spacing. [ec58d5f]
- [x] Task: Update `src/App.tsx` ToneIndicator (Sentiment Barometer) bottom spacing. [ec58d5f]
- [x] Task: Update `src/App.tsx` Controls container gap. [ec58d5f]
- [x] Task: Update `src/App.tsx` Navigation buttons top margin. [ec58d5f]
- [x] Task: Run tests and confirm they PASS. [ec58d5f]

## Phase 3: Verification and Clean-up
- [x] Task: Run `src/MobileLayout.test.tsx` and update it if necessary (as it might expect old `pt-4` etc.). [ec58d5f]
- [x] Task: Conductor - User Manual Verification 'Mobile/Tablet UI Spacing Optimization' (Protocol in workflow.md) [ec58d5f]
- [x] Task: Remove `src/MobileSpacingOptimization.test.tsx` (optional) or merge into `src/MobileLayout.test.tsx`. [ec58d5f]
