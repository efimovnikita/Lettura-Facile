# Implementation Plan: Clean Sentence Display Mode Switcher UI

## Phase 1: Preparation and Environment Setup [checkpoint: 792a3ec]
- [x] Task: Identify the relevant UI components and files for the sentence display mode switcher.
- [x] Task: Verify the existing "synonym indicator" icon implementation to ensure no visual interference.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Preparation' (Protocol in workflow.md)

## Phase 2: UI Modification - Removing Labels and Adding Icons [checkpoint: fe2b4d7]
- [x] Task: Remove text labels "Originale", "Simplificato", and "Traduzione" from the switcher UI.
- [x] Task: Integrate conceptual icons (e.g., "O", "S", "T" or equivalent SVGs/font icons) into the switcher.
- [x] Task: Ensure icons have appropriate `aria-label` for accessibility.
- [x] Task: Implement background highlight for the active display mode icon.
- [x] Task: Conductor - User Manual Verification 'Phase 2: UI Modification' (Protocol in workflow.md)

## Phase 3: Functionality and Visual Refinement [checkpoint: fe2b4d7]
- [x] Task: Verify that clicking/tapping the new icons correctly triggers the mode switch.
- [x] Task: Refine the layout and spacing of the switcher after label removal to ensure it looks balanced.
- [x] Task: Perform a visual check in "original sentence" mode to ensure no conflict with the synonym indicator icon.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Functionality and Visual Refinement' (Protocol in workflow.md)

## Phase 4: Final Validation and Cleanup [checkpoint: fe2b4d7]
- [x] Task: Run unit/integration tests to ensure no regressions in switcher functionality.
- [x] Task: Verify that no tooltips are present on the new icons.
- [x] Task: Conduct a final cross-browser and mobile responsiveness check (ensuring no layout breaks).
- [x] Task: Conductor - User Manual Verification 'Phase 4: Final Validation' (Protocol in workflow.md)