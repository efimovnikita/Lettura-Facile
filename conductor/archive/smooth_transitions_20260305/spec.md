# Specification: Smooth Sentence Mode Transitions

## Overview
Enhance the user experience by introducing a smooth, snappy cross-fade transition when switching between sentence modes (Original, Simplified, Translated). This aims to reduce the jarring visual jump currently experienced when content changes.

## Functional Requirements
- **Transition Style:** Implement a cross-fade animation between the different sentence versions using `framer-motion`.
- **Timing:** The transition should feel "snappy" with a duration of approximately 0.2s.
- **Height Management:** The container should smoothly morph its height to accommodate differences in text length between original, simplified, and translated versions.
- **Loading State:** When fetching AI-generated content (simplified or translated), the current content should remain visible (e.g., with reduced opacity or an overlay) until the new content is ready, preventing a blank state.
- **Unified Experience:** The transition should be applied consistently across all three modes (Original, Simplified, Translated).

## Non-Functional Requirements
- **Performance:** Animations must be hardware-accelerated and run smoothly (60fps) on both desktop and mobile.
- **Accessibility:** Ensure that transitions do not cause motion sickness and that screen readers still receive the updated content correctly.

## Acceptance Criteria
- [ ] Switching modes results in a smooth cross-fade between text versions.
- [ ] The sentence container height animates smoothly when the content length changes.
- [ ] During the loading state, the previous sentence version remains partially visible.
- [ ] No layout jumps occur during the transition process.

## Out of Scope
- Animating the initial text import or general app navigation.
- Changes to the Mistral AI integration logic itself.
- Redesign of the `ModeSwitch` component's UI elements.
