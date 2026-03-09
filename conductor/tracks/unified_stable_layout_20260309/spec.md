# Specification: Unified Stable Layout for All Screen Sizes

## 1. Overview
Unify the reader view across all screen sizes by applying the fixed-viewport layout (pinned header/footer, scrollable middle) to Desktop as well.

## 2. Functional Requirements
- **Global Viewport Fixing:** Remove `lg:h-auto` and `lg:overflow-visible` exceptions. The `reader-view` container must occupy exactly `h-[100dvh]` on all devices.
- **Unified Header/Footer:** Ensure the "Top Fixed Area" and "Bottom Fixed Area" remain pinned at the top and bottom of the viewport regardless of screen width.
- **Scrollable Central Area:** The middle section containing `SentenceDisplay` must be the only scrollable region (`flex-1 overflow-y-auto`).
- **Standard Scrollbars:** On desktop, standard browser scrollbars should be visible in the middle section if content overflows.
- **Centered Content:** Maintain the centered, bounded width (`max-w-4xl`) for the sentence content.

## 3. Acceptance Criteria
- On ALL devices:
    - Header/Footer are always visible.
    - Only the sentence area scrolls.
    - Tooltips/Synonyms scroll correctly.
    - No page-level scrolling in reader view.
- Desktop view remains functional and readable with scrollbars where necessary.
