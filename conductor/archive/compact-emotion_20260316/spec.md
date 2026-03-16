# Specification: Reduce Vertical Size of Sentence Emotion Element

## Overview
The goal of this track is to significantly reduce the vertical space occupied by the sentence emotion element in the story matrix. Currently, excessive margins and padding make the element take up too much vertical space, disrupting the flow of the matrix editor.

## Functional Requirements
- **Compact Layout**: Drastically reduce the vertical margin and padding of the emotion element.
- **Above-Sentence Position**: Maintain the position above each sentence, but ensure it is as compact as possible.
- **Hybrid Representation**: Keep both color and icon/emoji indicators for emotion, but in a more streamlined form.
- **Visual Integration**: Ensure the reduced size does not compromise the readability or clarity of the emotion indication.

## Non-Functional Requirements
- **Consistency**: The change should apply consistently across all instances where the emotion indicator is shown above a sentence.
- **Responsiveness**: The compact design must work well on various screen sizes (mobile and desktop).

## Acceptance Criteria
1. The vertical margin of the emotion element is reduced to zero or near-zero (e.g., 2-4px).
2. The vertical padding is reduced significantly (e.g., to 2-4px).
3. The emotion indicator (color + icon/emoji) is still clearly visible.
4. The overall vertical footprint of a sentence block in the matrix is noticeably smaller.

## Out of Scope
- Changing the emotion logic or the icons themselves.
- Redesigning the entire sentence block or matrix editor.
- Modifying the story preview or any other non-matrix UI elements.