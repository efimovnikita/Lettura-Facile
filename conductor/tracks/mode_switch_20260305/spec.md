# Specification: Single Display Mode Switch

## Overview
Implement a single 3-state sliding switch to control the display mode of the current active sentence. This switch will unify the viewing options (Original, Simplified, and Translated) into one cohesive UI element, replacing the existing fragmented controls.

## Functional Requirements
- **Three-State Control:** The switch must toggle between three distinct modes:
  1.  **Originale:** Displays the sentence as it appears in the source text.
  2.  **Semplificato:** Displays an AI-simplified version of the sentence in the target language.
  3.  **Traduzione:** Displays the English translation of the sentence.
- **UI Integration:**
  - Replace the existing "Traduci Frase" button located above "La prossima frase".
  - Remove the current 2-position switch (Originale/Semplificato) from the top of the application.
- **Session Persistence:** The selected mode **should NOT** be saved in the browser's Local Storage. The display mode will reset to "Originale" (or the default state) upon page reload.
- **Switching Behavior (Semplificato/Traduzione):**
  - When switching to "Semplificato", the original sentence must remain visible until the AI-simplified version is returned from the model.
  - (Consistency: Same behavior for "Traduzione" if the translation is not already cached).
- **Dynamic Updates:** Once the data is available, the switch state must immediately update the displayed sentence text without losing the user's current progress in the text.
- **AI Integration:** Trigger the existing Mistral AI services for simplification and translation when the respective modes are selected, if the data is not already available.

## Non-Functional Requirements
- **Visual Design:** The switch should follow a specific 3-mode sliding design. (Note: Visual sketches will be provided by the user during the implementation phase).
- **Responsiveness:** The switch must be easily accessible and functional on both desktop and mobile devices.
- **Clean UI:** Adhere to the project's minimalist aesthetic by replacing multiple controls with a single unified element.

## Acceptance Criteria
- [ ] A 3-position sliding switch is visible above the "La prossima frase" button.
- [ ] The top 2-position switch is removed.
- [ ] Switching to "Semplificato" or "Traduzione" maintains the original sentence text until the AI result is ready.
- [ ] Switching between modes correctly updates the text to the Original, Simplified, or Translated version once available.
- [ ] The display mode resets to the default on page reload.
- [ ] Mistral AI services are correctly invoked for Semplificato and Traduzione modes.

## Out of Scope
- Adding new AI models or changing the underlying simplification/translation logic (unless required for integration).
- Modifying the text import process or the overall sentence-by-sentence navigation logic.
