# Specification: Simplify Sentence View Toggle

## Goal
The goal of this track is to simplify the user interface on the second screen (sentence reading view) by removing the unused complexity level switch (Beginner, Intermediate, Advanced) and replacing it with a simple toggle between the original sentence and the AI-simplified version.

## Requirements
- **UI Clean-up:** Remove the "Beginner, Intermediate, Advanced" toggle/switch from the sentence view.
- **New Toggle:** Implement a simple two-state switch (e.g., "Original" vs "Simplified").
- **Default State:** The view should default to showing the original sentence.
- **Toggle Behavior:** When the user switches to "Simplified," the application should display the AI-simplified version of the current sentence.
- **Mistral Integration:** Ensure the "Simplified" state correctly triggers or displays the pre-simplified text from the Mistral AI service.

## Success Criteria
1. The three-level complexity switch is removed.
2. A new original/simplified toggle is present.
3. Switching between states correctly updates the displayed sentence text.
4. The application state for the toggle is preserved or reset appropriately during navigation.
