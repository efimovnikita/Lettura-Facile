# Specification: Show Original Sentence During Simplification Loading

## Overview
This track addresses the user experience during the text simplification process. Currently, the UI may not provide clear feedback while the Mistral AI engine is processing a request. This enhancement ensures that the original sentence remains visible to the user, and a loading indicator is displayed near the action button.

## Functional Requirements
- **Original Text Visibility:** The original sentence must remain visible in the "Sentence-by-Sentence" view while the simplified version is being fetched.
- **Loading Indicator:** A small spinner icon must be displayed adjacent to the "Semplificato" (Simplify) button while the AI request is in progress.
- **State Transition:** Once the simplified text is received, it should replace the original text or be displayed as the primary focus, as per the existing app logic, but the transition must be smooth.
- **Error Handling:** If the AI request fails (e.g., network error, API limit), the UI must continue to display the original sentence, and the loading spinner must be removed.

## Non-Functional Requirements
- **UI Responsiveness:** The spinner animation must not block the main thread.
- **Visual Consistency:** The loading spinner should match the existing UI aesthetic (Tailwind CSS 4 / Lucide-React).

## Acceptance Criteria
- [ ] Clicking the "Semplificato" button triggers a loading state.
- [ ] A spinner is visible next to the "Semplificato" button during loading.
- [ ] The original sentence remains visible while the spinner is active.
- [ ] Successful completion of the AI request replaces the original text with the simplified version.
- [ ] Failed AI requests stop the spinner and keep the original text visible.

## Out of Scope
- Redesigning the simplification logic or prompt.
- Changing the sentiment analysis loading state (unless requested).
