# Track: Remove 'Nuovo Testo' Label in Header

## Overview
This track involves a minor UI refinement to the main application screen. The "Nuovo Testo" (New Text) button in the header (top-left) currently displays both an icon and a text label. To save space and achieve a cleaner look, the text label will be removed, leaving only the icon.

## Functional Requirements
- **Header Button Refinement**: Remove the "Nuovo Testo" text from the header button (identified in `src/App.tsx`).
- **Accessibility**: Ensure the button remains accessible by adding an `aria-label="Nuovo Testo"`.
- **User Insight**: Add a `title="Nuovo Testo"` attribute to the button to provide a native browser tooltip on hover.

## Non-Functional Requirements
- **Visual Consistency**: The button's style (background, padding, color) should remain consistent with other header icons.

## Acceptance Criteria
- [ ] The "Nuovo Testo" text label is removed from the header button in the reader view.
- [ ] Only the `RotateCcw` icon is visible in the header button.
- [ ] The header button has `aria-label="Nuovo Testo"`.
- [ ] The header button has `title="Nuovo Testo"`.
- [ ] Other buttons labeled "Nuovo Testo" (e.g., in the reader's main content area) remain unchanged.

## Out of Scope
- Changing the icon itself.
- Redesigning the entire header or navigation system.
- Adding complex tooltip libraries.