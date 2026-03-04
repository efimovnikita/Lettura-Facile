# Implementation Plan: Dark Theme & Settings Panel

## Phase 1: Theme Management & Persistence
- [x] Task: Create `ThemeContext` and `useTheme` hook [8e208af]
    - [x] Create `src/hooks/useTheme.tsx` to manage light/dark state
    - [x] Implement persistence logic using `LocalStorage`
    - [x] Write unit tests for the theme state and persistence
- [x] Task: Configure Tailwind for manual dark mode [743a247]
    - [x] Update `index.css` or root component to apply the `.dark` class based on state
    - [x] Write tests to verify the class is applied correctly to the `<html>` or root element
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Theme Management' (Protocol in workflow.md)

## Phase 2: Settings Panel & API Key Management [checkpoint: ae061c9]
- [x] Task: Implement `SettingsPanel` component [748bf96]
    - [x] Create a `SettingsPanel.tsx` component that toggles visibility
    - [x] Add a "gear" settings icon to `App.tsx` on the main screen
    - [x] Write tests for the panel's open/close functionality
- [x] Task: Integrate Mistral API Key input [748bf96]
    - [x] Add a text input in the settings panel for the API key
    - [x] Implement persistence logic for the key in `LocalStorage`
    - [x] Write tests for the API key input and persistence
- [x] Task: Integrate Theme Toggle switch [748bf96]
    - [x] Add a toggle switch in the settings panel that calls `useTheme`
    - [x] Write tests to verify the toggle correctly changes the theme state
- [x] Task: Conductor - User Manual Verification 'Phase 2: Settings Panel' (Protocol in workflow.md)

## Phase 3: Comprehensive Dark Mode Styling
- [x] Task: Update Global Layout and App Styling [19a1972]
    - [x] Apply `dark:` variants to `App.tsx` and global background colors
    - [x] Ensure the "soft dark" (grey/navy) palette is used consistently
    - [x] Write visual/regression tests or component tests for dark mode styles
- [x] Task: Update `WordRenderer` and UI Components [19a1972]
    - [x] Apply dark mode styling to word highlights and dictionary popups
    - [x] Update `SimplifiedLoading` and sentiment indicators
    - [x] Write tests to verify visibility and contrast in dark mode
- [x] Task: Add smooth transitions and polishing [19a1972]
    - [x] Implement CSS transitions for background and text color changes
    - [x] Verify WCAG AA contrast ratios for dark mode text
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Dark Mode Styling' (Protocol in workflow.md)

## Phase 4: Final Verification
- [ ] Task: Final end-to-end verification of all features
    - [ ] Verify persistence of both theme and API key across reloads
    - [ ] Confirm dark mode applies correctly to all application states
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
