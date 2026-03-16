# Implementation Plan: Reduce Vertical Size of Sentence Emotion Element

## Phase 1: Research and Component Identification
- [ ] Task: Identify the React component(s) responsible for rendering the sentence emotion indicator.
- [ ] Task: Locate the CSS/Tailwind classes defining the current margins and padding for the emotion element.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Research and Component Identification' (Protocol in workflow.md)

## Phase 2: Refactor Emotion Element Styles (TDD)
- [ ] Task: Write failing tests for the compact emotion element.
    - [ ] Create/update tests in `src/components/__tests__/` to verify the new compact layout (reduced padding/margins).
    - [ ] Confirm tests fail.
- [ ] Task: Implement the compact styles in the identified component(s).
    - [ ] Reduce vertical padding (e.g., `py-1` or `pt-0.5 pb-0.5`).
    - [ ] Reduce or remove vertical margins (e.g., `my-0` or `mt-1 mb-0`).
    - [ ] Ensure the hybrid (color + icon/emoji) representation is preserved in the compact form.
    - [ ] Confirm tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Refactor Emotion Element Styles (TDD)' (Protocol in workflow.md)

## Phase 3: Matrix Editor Integration and Verification
- [ ] Task: Verify the visual integration within the `StoryMatrixEditor`.
    - [ ] Ensure the sentence blocks are correctly aligned.
    - [ ] Check for any regressions in the overall matrix layout.
- [ ] Task: Perform manual verification on mobile and desktop.
    - [ ] Verify touch targets and readability on small screens.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Matrix Editor Integration and Verification' (Protocol in workflow.md)

## Phase 4: Final Cleanup and Documentation
- [ ] Task: Run full test suite and linting.
- [ ] Task: Update any relevant documentation if necessary.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Cleanup and Documentation' (Protocol in workflow.md)