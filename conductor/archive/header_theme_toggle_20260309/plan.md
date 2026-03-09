# Implementation Plan: Header Theme Toggle

## Phase 1: Test Setup and Refactoring [checkpoint: 56f938b]
- [x] Task: Create a new test file `src/HeaderThemeToggle.test.tsx` to verify the presence and functionality of the theme toggle in the reader view header.
- [x] Task: Run tests and confirm failure (Red phase).
- [x] Task: Extract the theme toggle logic from `src/components/SettingsPanel.tsx` into a new reusable component `src/components/ThemeToggle.tsx`.
- [x] Task: Update `SettingsPanel.tsx` to use the new `ThemeToggle` component and verify it still works.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Preparation and Refactoring' (Protocol in workflow.md) 56f938b

## Phase 2: Header Integration [checkpoint: 08d879f]
- [x] Task: Import `ThemeToggle` in `src/App.tsx`.
- [x] Task: Insert the `ThemeToggle` component into the header of the Reader View, positioned to the right of the 'Nuovo Testo' button.
- [x] Task: Adjust styling (gap, vertical alignment) to ensure the header looks balanced on both desktop and mobile.
- [x] Task: Run tests and confirm they pass (Green phase).
- [x] Task: Conductor - User Manual Verification 'Phase 2: Header Integration' (Protocol in workflow.md) 08d879f

## Phase 3: Final Verification and Cleanup [checkpoint: 08d879f]
- [x] Task: Perform a final check of the theme persistence and cross-view synchronization (toggling in header should update the state used by `SettingsPanel`).
- [x] Task: Run full test suite to ensure no regressions.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md) 08d879f
