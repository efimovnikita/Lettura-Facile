# Specification: Fix Phrase Translation Double-Click Logic

## Overview
This track aims to fix the inconsistent interaction logic for phrase translation between mobile and desktop versions. Currently, on desktop, a triple-click is required to select and translate a phrase, while on mobile, a double-click works correctly.

## Problem Description
- **Current Behavior (Desktop):** Users must triple-click on a word to add it to a phrase for translation.
- **Current Behavior (Mobile):** Double-click correctly adds a word to the phrase.
- **Expected Behavior:** Single-click translates a single word. Double-clicking a word should add it to the currently active phrase and translate the entire phrase. This should work consistently on all devices.

## Functional Requirements
1.  **Consistent Interaction:** Implement double-click logic for phrase expansion on both desktop and mobile.
2.  **Single-Word Translation:** Maintain single-click functionality for individual word translation.
3.  **Phrase Expansion:** Each double-click on a new word should append that word to the current phrase selection.
4.  **Reset Selection:** A single click on a word should reset the phrase selection and display only that word's translation.

## Non-Functional Requirements
- **Responsiveness:** Interaction must be fluid and feel immediate.
- **Compatibility:** Ensure the fix works across major browsers (Chrome, Firefox, Safari).

## Acceptance Criteria
- [ ] Double-clicking a word on desktop adds it to the current phrase.
- [ ] Multiple double-clicks correctly build a multi-word phrase.
- [ ] Single-click resets the phrase to a single word.
- [ ] Mobile behavior remains functional and unchanged.

## Out of Scope
- Modifying the translation engine or UI appearance.
- Adding new features to the dictionary or tooltip.
