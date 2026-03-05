# Implementation Plan: 3-State Display Mode Switch

## Phase 1: Preparation & UI Cleanup [checkpoint: 3fcaea8]
Goal: Prepare the codebase for the new switch by removing legacy UI elements and researching state management.

- [x] Task: Research current sentence state management and AI triggering logic. [ea1e1e1]
- [x] Task: Remove the existing 2-position switch (Originale/Semplificato) from the top UI. [dd9ca10]
- [x] Task: Remove the "Traduci Frase" button above "La prossima frase". [dd9ca10]
- [x] Task: Conductor - User Manual Verification 'Phase 1: Preparation & UI Cleanup' (Protocol in workflow.md) [3fcaea8]

## Phase 2: New Switch Component Development [checkpoint: 3c9996f]
Goal: Create the UI component for the 3-state sliding switch.

- [x] Task: Request the visual sketch/image for the 3-state sliding switch from the user. [c5e7505]
- [x] Task: Create the `ModeSwitch` component with 3 states (Originale, Semplificato, Traduzione). [572abc1]
- [x] Task: Implement styling for the sliding switch using Tailwind CSS 4 to match the user's provided sketch. [129daba]
- [x] Task: Conductor - User Manual Verification 'Phase 2: New Switch Component Development' (Protocol in workflow.md) [3c9996f]

## Phase 3: State Integration & AI Logic [checkpoint: 44a3ef3]
Goal: Wire the new switch into the application's state and Mistral AI services.

- [x] Task: Implement mode selection state (NOT persistent in Local Storage). [44a3ef3]
- [x] Task: Update the sentence rendering logic to respond to the new switch mode. [44a3ef3]
- [x] Task: Ensure the AI simplified/translated version is fetched when the mode is selected if not already present. [44a3ef3]
- [x] Task: Implement the requirement: "Show the original sentence while waiting for AI results in 'Semplificato' and 'Traduzione' modes." [44a3ef3]
- [x] Task: Conductor - User Manual Verification 'Phase 3: State Integration & AI Logic' (Protocol in workflow.md) [44a3ef3]

## Phase 4: Testing & Final Polishing
Goal: Verify all requirements and perform final UI refinements.

- [ ] Task: Add unit tests for the `ModeSwitch` component and state updates.
- [ ] Task: Add integration tests for the "show original while loading" behavior.
- [ ] Task: Verify that the switch state resets on page reload.
- [ ] Task: Final UI/UX refinement based on user feedback.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Testing & Final Polishing' (Protocol in workflow.md)
