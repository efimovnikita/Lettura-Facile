# Track: Header Theme Toggle

## Overview
This feature adds a theme toggle (Light/Dark mode) to the Reader View header. This allows users to switch themes quickly while reading without having to navigate back to the settings panel on the input screen.

## Functional Requirements
- **Reader View Header Integration**: Add a theme toggle component to the header of the reader view.
- **Placement**: Position the toggle to the right of the 'Nuovo Testo' (Reset) button in the top-left area of the screen.
- **Theme Sync**: The toggle must use the existing `useTheme` hook to ensure global theme state consistency.
- **Visual Style**: Use the same sliding knob design and Sun/Moon icon logic as seen in the `SettingsPanel`.
- **Accessibility**: Include an `aria-label` for the toggle.

## Non-Functional Requirements
- **Consistency**: The toggle's visual behavior (animations, colors) must match the existing toggle in the settings panel.
- **Responsiveness**: The toggle should remain in the header on mobile devices.

## Acceptance Criteria
- [ ] Theme toggle is visible in the Reader View header.
- [ ] Toggle is placed correctly (right of 'Nuovo Testo').
- [ ] Clicking the toggle switches the app between light and dark themes.
- [ ] The icon and knob position update to reflect the current theme state.
- [ ] Theme state is persisted across page reloads (already handled by `useTheme`).

## Out of Scope
- Redesigning the `useTheme` hook.
- Modifying the theme colors or dark mode CSS.
