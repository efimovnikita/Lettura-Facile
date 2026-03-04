# Specification: Dark Theme Implementation & Settings Panel

## Overview
Implement a dark theme for the "Lettura-Facile" application and introduce a Settings panel on the primary screen. The Settings panel will provide a central location for user-controlled options, specifically for entering a Mistral API key and toggling the application's theme.

## Functional Requirements
1. **Settings Panel UI:** Add a settings button (e.g., a "gear" icon) to the main interface that opens a small, non-obtrusive settings panel.
2. **Mistral API Key Input:** Within the settings panel, include an input field for users to enter their Mistral AI API key, ensuring it's securely stored in `LocalStorage`.
3. **Manual Theme Toggle:** Include a switch inside the settings panel to toggle between light and dark themes manually.
4. **Persistent State:** The theme preference and the Mistral API key must persist in `LocalStorage` across sessions.
5. **Soft Dark Aesthetic:** Apply a consistent "soft dark" (grey/navy) color palette to the entire application when dark mode is active.

## Non-Functional Requirements
- **Smooth Transitions:** Implement CSS transitions for theme changes to ensure a polished user experience.
- **Tailwind CSS 4 Integration:** Leverage Tailwind's `dark:` variant for consistent dark mode styling.
- **Accessibility:** Ensure the settings icon is clearly visible on the primary screen and all elements within the panel are easy to interact with.

## Acceptance Criteria
- [x] A settings button is visible on the main screen.
- [x] Clicking the button opens a settings panel with an API key input and a theme toggle.
- [ ] The theme choice persists after page refresh.
- [ ] The Mistral API key persists after page refresh.
- [ ] Dark mode uses a soft dark grey/navy palette that is accessible (WCAG AA).
- [ ] All UI components (reader, dictionary, etc.) are correctly styled in dark mode.

## Out of Scope
- Automatic theme switching based on OS/system preference.
- Multiple themes or custom color schemes beyond the light/soft-dark options.
