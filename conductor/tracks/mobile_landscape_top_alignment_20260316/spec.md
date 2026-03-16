# Specification: Mobile Landscape Vertical Alignment Fix

## Overview
Currently, in landscape orientation on mobile devices (smartphones and tablets), the text of the current sentence is vertically centered within its container. This track aims to change this behavior so that the sentence text is aligned to the top (vertical start) of its containing block.

## Functional Requirements
- **Top Alignment**: The text of the current sentence MUST be aligned to the top vertical edge of its containing block when the device is in landscape orientation.
- **Scope**: This applies specifically to the "current sentence display block".
- **Responsive Behavior**:
    - **Smartphones Landscape**: Alignment MUST be at the top edge.
    - **Tablets Landscape**: Alignment MUST be at the top edge.
- **Visual Style**: The text should be flush with the top edge (zero or minimal padding as specified).

## Non-Functional Requirements
- **Visual Consistency**: The alignment change should feel integrated and not cause layout shifts or overlaps with other UI elements (e.g., header, controls).
- **Maintainability**: Use standard CSS/Tailwind classes for alignment to ensure ease of future adjustments.

## Acceptance Criteria
1. [ ] On a mobile device (or simulated mobile) in **landscape** mode, the current sentence text is positioned at the top of its container.
2. [ ] The vertical centering previously observed is removed in landscape mode.
3. [ ] Portrait orientation remains unaffected (or continues to follow its design spec, likely centered or top-aligned as per current layout).
4. [ ] No regression in text readability or interaction (word clicking/tapping).

## Out of Scope
- Changes to text size or font style.
- Changes to the horizontal alignment (likely remains centered or left-aligned).
- General redesign of the mobile layout beyond this specific alignment fix.
