# Implementation Plan: Mobile Vertical Space Optimization

## Phase 1: Environment & Test Preparation [checkpoint: 4fc421a]
- [x] Task: Review existing tests for `App.tsx` and `SentenceDisplay.tsx` to ensure a baseline for layout tests. f3c71e7
- [x] Task: Create a new test file `src/MobileLayout.test.tsx` to specifically test responsive layout changes. 23bbb18
- [x] Task: Write failing tests in `src/MobileLayout.test.tsx` to verify current large margins and sentence height on mobile (should fail after implementation). 88f88ce
- [x] Task: Conductor - User Manual Verification 'Environment & Test Preparation' (Protocol in workflow.md) 4fc421a

## Phase 2: Optimize Margins and Paddings (Reader View)
- [x] Task: Write TDD tests for `App.tsx` Reader view to ensure specific Tailwind classes are applied on mobile/desktop. e563a0d
- [x] Task: Update `App.tsx` Reader view to use responsive padding: `pt-4 md:pt-16` on `<main>`. 5c3633e
- [x] Task: Update `App.tsx` Reader view header to use `mb-4 md:mb-12`. b305f01
- [x] Task: Update `App.tsx` Reader view to use `mb-6 md:mb-12` on `SentenceDisplay`. cf0af20
- [x] Task: Update `App.tsx` Reader view `ToneIndicator` container to use `mb-4 md:mb-10`. 09c5db9
- [x] Task: Update `App.tsx` Reader view `<main>` bottom padding to `pb-10 md:pb-20`. 3ef5442
- [x] Task: Verify that all tests pass for the margin changes. c0c5999
- [ ] Task: Conductor - User Manual Verification 'Optimize Margins and Paddings' (Protocol in workflow.md)

## Phase 3: Responsive Sentence Area Height
- [ ] Task: Write TDD tests for `SentenceDisplay.tsx` to verify `min-h-[160px]` on mobile and `min-h-[240px]` on desktop.
- [ ] Task: Modify `SentenceDisplay.tsx` to apply `min-h-[160px] md:min-h-[240px]`.
- [ ] Task: Verify that all tests pass for the height changes.
- [ ] Task: Conductor - User Manual Verification 'Responsive Sentence Area Height' (Protocol in workflow.md)

## Phase 4: Final Validation
- [ ] Task: Run full test suite and check code coverage.
- [ ] Task: Verify desktop layout remains intact.
- [ ] Task: Conductor - User Manual Verification 'Final Validation' (Protocol in workflow.md)
