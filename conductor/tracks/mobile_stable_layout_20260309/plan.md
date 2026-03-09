# Implementation Plan: Mobile/Tablet Stable Layout with Fixed Header and Footer [checkpoint: 32d9be2]

## Phase 1: Preparation & Red Phase (TDD)
- [x] Task: Identify current layout boundaries in `App.tsx` and create a reproduction test for the scrolling behavior. [32d9be2]
- [x] Task: Write a test that asserts the existence of a scrollable middle section on mobile. [32d9be2]
- [x] Task: Confirm tests fail on the current fluid layout. [32d9be2]

## Phase 2: Refactoring Reader Layout (Mobile Only)
- [x] Task: Restructure the `reader-view` container to use `h-[100dvh]` (dynamic viewport height) and `flex flex-col overflow-hidden` for screens < 1024px. [32d9be2]
- [x] Task: Isolate the Header and Sentiment Barometer into a fixed top section. [32d9be2]
- [x] Task: Isolate the ModeSwitch and Navigation Buttons into a fixed bottom section. [32d9be2]
- [x] Task: Wrap the `SentenceDisplay` (and its related tooltips/errors) in a `flex-1 overflow-y-auto` container for scrolling. [32d9be2]
- [x] Task: Ensure solid background classes are applied to the fixed top and bottom areas. [32d9be2]

## Phase 3: Integration & UX Tuning
- [x] Task: Adjust vertical spacing/padding to account for the new fixed sections (e.g., removing the `sticky` from the sentiment barometer). [32d9be2]
- [x] Task: Verify that translation tooltips and synonyms scroll correctly within the central area. [32d9be2]
- [x] Task: Run all tests and verify responsive behavior on desktop (remains fluid). [32d9be2]
- [x] Task: Conductor - User Manual Verification 'Mobile/Tablet Stable Layout' (Protocol in workflow.md) [32d9be2]

