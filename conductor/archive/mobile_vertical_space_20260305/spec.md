# Track Specification: Mobile Vertical Space Optimization

## Overview
This track aims to improve the user experience on mobile devices by optimizing the vertical space usage in the "Reader" view. Currently, large margins and a tall minimum height for the sentence display area result in unnecessary scrolling and a less efficient use of limited screen real estate.

## Goals
- Increase the visible content area on small screens.
- Reduce vertical scrolling in the Reader view.
- Maintain a consistent and clean aesthetic across all devices.

## Functional Requirements

### 1. Reduced Sentence Area Height
- **Current:** The `SentenceDisplay` component has a hardcoded `min-h-[240px]`.
- **Change:** Implement a responsive minimum height. On mobile screens (below `md` breakpoint), the minimum height should be reduced to `160px`. On larger screens, it should remain `240px`.

### 2. Optimized Margins and Paddings (Reader View)
The following vertical spacings should be adjusted for mobile screens:
- **Main Container Top Padding:** Reduce from `pt-8` to `pt-4` on mobile (`pt-4 md:pt-16`).
- **Header Bottom Margin:** Reduce from `mb-8` to `mb-4` on mobile (`mb-4 md:mb-12`).
- **Sentence Display Bottom Margin:** Reduce from `mb-12` to `mb-6` on mobile (`mb-6 md:mb-12`).
- **Sentiment Indicator (ToneIndicator) Margin:** Reduce the container's bottom margin from `mb-10` to `mb-4` on mobile (`mb-4 md:mb-10`).
- **Main Content Bottom Padding:** Reduce `pb-20` to `pb-10` on mobile (`pb-10 md:pb-20`).

### 3. Preservation of Desktop Layout
- All changes must use Tailwind's responsive prefixes (e.g., `pt-4 md:pt-16`) to ensure the desktop layout remains unaffected.

## Non-Functional Requirements
- **Responsive Design:** Ensure the layout adjusts smoothly between different screen sizes.
- **Maintainability:** Use standard Tailwind CSS utility classes.

## Out of Scope
- Changes to the "Input View" (pasting text).
- Changes to the "Sentiment Indicator" visual display or logic.
- Changes to the "Mode Switch" or control button arrangement.
- Changes to font sizes.

## Acceptance Criteria
- On mobile devices (screen width < 768px), the `SentenceDisplay` has a minimum height of `160px`.
- On mobile devices, vertical margins in the `Reader` view are visibly reduced according to the functional requirements.
- On desktop screens (screen width >= 768px), all spacings and heights remain unchanged.
- The "Input View" layout remains unchanged on all devices.
