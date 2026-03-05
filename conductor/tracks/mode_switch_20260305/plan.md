# Implementation Plan: 3-State Display Mode Switch

## Phase 1: Preparation & UI Cleanup
Goal: Prepare the codebase for the new switch by removing legacy UI elements and researching state management.

- [x] Task: Research current sentence state management and AI triggering logic. [ea1e1e1]
- [x] Task: Remove the existing 2-position switch (Originale/Semplificato) from the top UI. [dd9ca10]
- [x] Task: Remove the "Traduci Frase" button above "La prossima frase". [dd9ca10]
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Preparation & UI Cleanup' (Protocol in workflow.md)

## Phase 2: New Switch Component Development
Goal: Create the UI component for the 3-state sliding switch.

- [ ] Task: Request the visual sketch/image for the 3-state sliding switch from the user.
- [ ] Task: Create the `ModeSwitch` component with 3 states (Originale, Semplificato, Traduzione).
- [ ] Task: Implement styling for the sliding switch using Tailwind CSS 4 to match the user's provided sketch.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: New Switch Component Development' (Protocol in workflow.md)

## Phase 3: State Integration & AI Logic
Goal: Wire the new switch into the application's state and Mistral AI services.

- [ ] Task: Implement mode selection state (NOT persistent in Local Storage).
- [ ] Task: Update the sentence rendering logic to respond to the new switch mode.
- [ ] Task: Ensure the AI simplified/translated version is fetched when the mode is selected if not already present.
- [ ] Task: Implement the requirement: "Show the original sentence while waiting for AI results in 'Semplificato' and 'Traduzione' modes."
- [ ] Task: Conductor - User Manual Verification 'Phase 3: State Integration & AI Logic' (Protocol in workflow.md)

## Phase 4: Testing & Final Polishing
Goal: Verify all requirements and perform final UI refinements.

- [ ] Task: Add unit tests for the `ModeSwitch` component and state updates.
- [ ] Task: Add integration tests for the "show original while loading" behavior.
- [ ] Task: Verify that the switch state resets on page reload.
- [ ] Task: Final UI/UX refinement based on user feedback.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Testing & Final Polishing' (Protocol in workflow.md)
