# Implementation Plan: Dark Theme & Settings Panel

## Phase 1: Theme Management & Persistence
- [ ] Task: Create `ThemeContext` and `useTheme` hook
    - [ ] Create `src/hooks/useTheme.tsx` to manage light/dark state
    - [ ] Implement persistence logic using `LocalStorage`
    - [ ] Write unit tests for the theme state and persistence
- [ ] Task: Configure Tailwind for manual dark mode
    - [ ] Update `index.css` or root component to apply the `.dark` class based on state
    - [ ] Write tests to verify the class is applied correctly to the `<html>` or root element
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Theme Management' (Protocol in workflow.md)

## Phase 2: Settings Panel & API Key Management
- [ ] Task: Implement `SettingsPanel` component
    - [ ] Create a `SettingsPanel.tsx` component that toggles visibility
    - [ ] Add a "gear" settings icon to `App.tsx` on the main screen
    - [ ] Write tests for the panel's open/close functionality
- [ ] Task: Integrate Mistral API Key input
    - [ ] Add a text input in the settings panel for the API key
    - [ ] Implement persistence logic for the key in `LocalStorage`
    - [ ] Write tests for the API key input and persistence
- [ ] Task: Integrate Theme Toggle switch
    - [ ] Add a toggle switch in the settings panel that calls `useTheme`
    - [ ] Write tests to verify the toggle correctly changes the theme state
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Settings Panel' (Protocol in workflow.md)

## Phase 3: Comprehensive Dark Mode Styling
- [ ] Task: Update Global Layout and App Styling
    - [ ] Apply `dark:` variants to `App.tsx` and global background colors
    - [ ] Ensure the "soft dark" (grey/navy) palette is used consistently
    - [ ] Write visual/regression tests or component tests for dark mode styles
- [ ] Task: Update `WordRenderer` and UI Components
    - [ ] Apply dark mode styling to word highlights and dictionary popups
    - [ ] Update `SimplifiedLoading` and sentiment indicators
    - [ ] Write tests to verify visibility and contrast in dark mode
- [ ] Task: Add smooth transitions and polishing
    - [ ] Implement CSS transitions for background and text color changes
    - [ ] Verify WCAG AA contrast ratios for dark mode text
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Dark Mode Styling' (Protocol in workflow.md)

## Phase 4: Final Verification
- [ ] Task: Final end-to-end verification of all features
    - [ ] Verify persistence of both theme and API key across reloads
    - [ ] Confirm dark mode applies correctly to all application states
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
