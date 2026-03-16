# Specification: Mobile Landscape Navigation Fix

## Overview
A bug was reported where the sentence navigation buttons ("Previous Sentence" and "Next Sentence") are not visible (off-screen) when a mobile device (specifically Android) is in landscape orientation. This prevents users from navigating the text in this mode.

## Functional Requirements
1.  **Visibility**: The "Previous" and "Next" sentence navigation controls must be visible and functional in landscape orientation on all mobile devices.
2.  **Responsive Layout**: The layout must account for the limited vertical space in landscape mode, ensuring that navigation controls are prioritized and not pushed off-screen by other elements.
3.  **Stability**: Ensure that the "Pinned navigation and headers" guideline (from `product.md`) is maintained without obscuring the main text area.

## Non-Functional Requirements
- **Performance**: No perceptible lag when rotating the device.
- **Accessibility**: Buttons must maintain adequate touch targets (44x44px per `workflow.md`).

## Acceptance Criteria
- [x] Navigation buttons (Prev/Next) are fully visible in landscape orientation.
- [ ] Navigation buttons are clickable/tappable.
- [ ] No regression in portrait mode layout.
- [ ] The main sentence display remains readable and does not overlap with the fixed navigation.
- [ ] Verified on Android (Chrome) and ideally iOS (Safari) simulators.

## Out of Scope
- Redesigning the buttons' appearance (unless necessary for visibility).
- Changing the navigation logic itself.
- Adding new features.
