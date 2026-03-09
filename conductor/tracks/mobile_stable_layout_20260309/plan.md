# Implementation Plan: Mobile/Tablet Stable Layout with Fixed Header and Footer

## Phase 1: Preparation & Red Phase (TDD)
- [x] Task: Identify current layout boundaries in `App.tsx` and create a reproduction test for the scrolling behavior.
- [x] Task: Write a test that asserts the existence of a scrollable middle section on mobile.
- [x] Task: Confirm tests fail on the current fluid layout.

## Phase 2: Refactoring Reader Layout (Mobile Only)
- [x] Task: Restructure the `reader-view` container to use `h-[100dvh]` (dynamic viewport height) and `flex flex-col overflow-hidden` for screens < 1024px.
- [x] Task: Isolate the Header and Sentiment Barometer into a fixed top section.
- [x] Task: Isolate the ModeSwitch and Navigation Buttons into a fixed bottom section.
- [x] Task: Wrap the `SentenceDisplay` (and its related tooltips/errors) in a `flex-1 overflow-y-auto` container for scrolling.
- [x] Task: Ensure solid background classes are applied to the fixed top and bottom areas.

## Phase 3: Integration & UX Tuning
- [~] Task: Adjust vertical spacing/padding to account for the new fixed sections (e.g., removing the `sticky` from the sentiment barometer).
- [~] Task: Verify that translation tooltips and synonyms scroll correctly within the central area.
- [~] Task: Run all tests and verify responsive behavior on desktop (remains fluid).
- [~] Task: Conductor - User Manual Verification 'Mobile/Tablet Stable Layout' (Protocol in workflow.md)
