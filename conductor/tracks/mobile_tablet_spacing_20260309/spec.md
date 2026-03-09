# Specification: Mobile/Tablet UI Spacing Optimization

## 1. Overview
Optimize vertical spacing on mobile and tablet devices (< 1024px) to maximize the reading area.

## 2. Functional Requirements
- **Top Spacing:** Reduce vertical gaps between Header, Main container start, and ToneIndicator.
- **Bottom Spacing:** Reduce vertical gaps between ModeSwitch and the navigation button container.
- **Target Devices:** Apply changes to all screens smaller than the Tailwind `lg` breakpoint (1024px).
- **Stickiness:** Keep the Sentiment Barometer (ToneIndicator) sticky at the top on mobile.

## 3. Acceptance Criteria
- On screens < 1024px:
    - Header `mb-4` -> `mb-1` (and `md:mb-12` -> `lg:mb-12`)
    - Main `pt-4` -> `pt-1` (and `md:pt-16` -> `lg:pt-16`)
    - ToneIndicator container `mb-2` -> `mb-1` (and `md:mb-10` -> `lg:mb-10`)
    - Controls container `gap-3` -> `gap-1` (and `md:gap-6` -> `lg:gap-6`)
    - Navigation Buttons `mt-4` -> `mt-1` (and `md:mt-8` -> `lg:mt-8`)
- Desktop view (>= 1024px) remains spacious and unchanged.
- All elements remain readable and functional on mobile.
