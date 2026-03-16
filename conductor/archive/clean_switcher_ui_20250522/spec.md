# Specification: Clean Sentence Display Mode Switcher UI

## 1. Overview
This track aims to simplify the sentence display mode switcher UI by removing the text-based labels ("Originale", "Simplificato", "Traduzione") located on the left, right, and bottom of the switcher and replacing them with conceptual icons. The goal is to create a cleaner interface while maintaining usability through visual cues and ensuring no visual conflict with existing UI elements.

## 2. Functional Requirements
- **Remove Text Labels**: Eliminate the "Originale", "Simplificato", and "Traduzione" labels surrounding the display mode switcher.
- **Implement Icons**: Replace these text labels with conceptual icons (e.g., "O" for Originale, "S" for Simplificato, "T" for Traduzione or similar visual representations).
- **Active State Indication**: Use a background highlight to clearly indicate which display mode is currently active.
- **Maintain Switcher Functionality**: Ensure that clicking/tapping the icons or the switcher correctly toggles between the available display modes.
- **Avoid Icon Interference**:
  - In the "original sentence" mode, the candle icon inside the button already shows an icon indicating the presence of synonyms.
  - Ensure the new mode switcher icons are visually distinct and do not interfere with or cause confusion with this existing synonym indicator.

## 3. Non-Functional Requirements
- **Visual Consistency**: Icons should match the existing UI/UX style of the "Lettura Facile" application.
- **Performance**: Icon rendering should not negatively impact the initial load time or responsiveness of the UI.
- **Accessibility**: Ensure that icons have appropriate `aria-label` attributes for screen readers to describe the mode they represent (e.g., "Originale," "Simplificato," "Traduzione").

## 4. Acceptance Criteria
- [ ] No text labels ("Originale", "Simplificato", "Traduzione") are visible around the display mode switcher.
- [ ] Icons are present and accurately represent the display modes.
- [ ] The active mode is visually distinct via a background highlight.
- [ ] Users can still switch modes correctly by interacting with the new UI.
- [ ] **Verified**: The mode switcher icons do not visually clash with the synonym indicator icon in the original sentence mode.
- [ ] No tooltips are present (as requested).

## 5. Out of Scope
- Adding tooltips for mode explanation.
- Changing the underlying logic of the display modes themselves.
- Major layout restructuring of the entire page.
- Mobile-specific view adjustments (unless layout breaks due to label removal).