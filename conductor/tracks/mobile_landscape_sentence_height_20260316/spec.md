# Specification: Mobile Landscape Active Sentence Height Fix

## Overview
Currently, the block displaying the active sentence (Original, Simplified, or Translated) has an insufficient height when the mobile device is in landscape orientation. This makes it difficult for users to read longer sentences or interact with the text. This track aims to optimize the vertical space for the active sentence block specifically for mobile landscape mode.

## Functional Requirements
- **Responsive Height (Landscape):** In mobile landscape orientation, the active sentence block must have a minimum height based on a percentage of the viewport height (e.g., `45vh`).
- **Internal Scrolling:** If the sentence text (Original, Simplified, or Translated) exceeds the allocated height, the block should provide internal vertical scrolling to ensure all content is accessible without breaking the overall layout.
- **Consistent Application:** The fix must apply to all three unified display modes:
  - Original Sentence
  - AI-Simplified Sentence
  - Translated Sentence

## Non-Functional Requirements
- **Stability:** The layout must remain stable as defined in the Product Guidelines, with pinned navigation and headers.
- **Visual Consistency:** The internal scrollbar (if visible) should match the application's minimalist aesthetic.
- **Performance:** Height adjustments should be handled efficiently using CSS (Tailwind CSS 4) without causing layout thrashing or lag.

## Acceptance Criteria
- [ ] On a mobile device (or simulated) in landscape mode, the active sentence block takes up approximately 45% of the viewport height.
- [ ] If a long sentence is displayed, it can be scrolled vertically within the block.
- [ ] The fixed height and scroll behavior work correctly when switching between Original, Simplified, and Translated modes.
- [ ] The pinned headers and navigation remain accessible and do not overlap with the expanded sentence block.

## Out of Scope
- Changing the layout or height for portrait orientation.
- Modifying the text simplification or translation logic itself.
- Changing the font size or style of the text.
