# Specification - Synonym Toggle Stability

## Overview
The synonym display feature currently enables the "Show Synonyms" toggle regardless of whether matches are actually found in the current sentence. This leads to a confusing UI where the toggle is active but clicking it produces no results (e.g., when words are hyphenated or fragmented). This track aims to synchronize the toggle's enabled state with the presence of exact word matches in the text.

## Functional Requirements
1.  **Exact Match Verification**:
    *   The application must perform a check to see if any "original word" from the synonym list exists in the current sentence.
    *   Matching should be based on **exact string equality** for discrete words in the sentence.
2.  **Conditional Toggle Activation**:
    *   The synonym toggle button must be **disabled** (inactive) if no exact matches are found in the current sentence.
    *   The toggle button must be **enabled** only if at least one match is present.

## Acceptance Criteria
*   Given a sentence "Ma il gigante li rassicurò subito." and a synonym for "rassicurò", the toggle is **enabled**.
*   Given a sentence "Ma il gigante li rass-icurò subito." (hyphenated) and a synonym for "rassicurò", the toggle is **disabled** (as exact match fails).
*   When the user navigates between sentences, the toggle state updates immediately based on the content of the new sentence and the available synonyms.

## Out of Scope
*   Handling hyphenated or fragmented words (e.g., "rass-icurò" matching "rassicurò").
*   Modifying the synonym extraction logic or the AI prompt.
