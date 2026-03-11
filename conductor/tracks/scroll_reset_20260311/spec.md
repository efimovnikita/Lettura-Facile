# Specification: Scroll Text Area to Top on Mode Switch

## Overview
This track addresses a usability issue where switching between display modes (Simplified/Original) or loading a new sentence leaves the text area at its previous scroll position. The goal is to ensure that the user always starts reading from the top when the content changes or the view mode is toggled.

## Functional Requirements
- **Scroll Reset on Mode Switch:** When the user toggles between "Simplified" and "Original" modes, the text display area must automatically scroll to the top.
- **Scroll Reset on New Content:** When a new sentence is loaded or selected, the text display area must automatically scroll to the top.
- **Instant Scroll:** The scroll reset should be immediate (instant jump) rather than animated.

## Non-Functional Requirements
- **Stability:** The scroll reset must be reliable and occur after the content has updated to avoid "phantom" scrolling or being overridden by rendering updates.
- **Performance:** The scroll operation must not introduce noticeable lag or layout shifts.

## Acceptance Criteria
- [ ] Switching mode via the ModeSwitch component resets scroll position of the sentence display area to `top: 0`.
- [ ] Loading a new sentence (e.g., through navigation or input) resets scroll position of the sentence display area to `top: 0`.
- [ ] The scroll reset is instant (no smooth animation).
- [ ] The behavior is consistent across mobile and desktop layouts.

## Out of Scope
- Smooth scrolling animations (requested as Instant).
- Scrolling other components (like settings or dictionary) to the top.
