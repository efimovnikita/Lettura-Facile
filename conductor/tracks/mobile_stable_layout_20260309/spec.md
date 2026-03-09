# Specification: Mobile/Tablet Stable Layout with Fixed Header and Footer

## 1. Overview
The current reader view in Lettura-Facile has a fluid layout where the entire page scrolls. This track aims to implement a fixed-viewport layout specifically for mobile and tablet devices (< 1024px), where the header, sentiment panel, and controls are pinned, and the sentence content (with synonyms and tooltips) becomes scrollable.

## 2. Functional Requirements
- **Viewport Fixing:** For screens smaller than `lg` (1024px), the reader view should occupy exactly 100% of the viewport height (`h-[100dvh]`).
- **Fixed Header Area:** The top section (Header and ToneIndicator/Sentiment Barometer) must be fixed at the top of the screen with a solid background matching the page theme.
- **Fixed Footer Area:** The bottom section (ModeSwitch and navigation buttons) must be fixed at the bottom of the screen with a solid background.
- **Scrollable Content:** The central area containing the `SentenceDisplay` must be scrollable.
- **Interactive Sync:** Synonyms and translation tooltips must remain correctly positioned relative to the scrolling sentence.

## 3. Acceptance Criteria
- On devices < 1024px:
    - The Header and Sentiment Barometer are always visible and pinned to the top.
    - The ModeSwitch and navigation buttons are always visible and pinned to the bottom.
    - The middle section containing the sentence text scrolls if it exceeds the available space.
    - Clicks, long-presses, and tooltips work correctly within the scrollable area.
- Desktop experience remains unchanged.

## 4. Out of Scope
- Redesigning the components themselves.
- Changes to the input view or settings.
