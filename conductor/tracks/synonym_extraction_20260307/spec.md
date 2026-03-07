# Track: Background Synonym Extraction for Complex Words

## Overview
This track aims to implement a background process that identifies "complex" words in each sentence of the imported text and fetches synonyms for them using the Mistral AI model. The extracted data (word-synonym pairs) will be persisted in the browser's Local Storage for future use. This process must be non-blocking and run similarly to the existing background sentiment analysis.

## Functional Requirements
1.  **AI Identification of Complex Words:** The AI (Mistral) should automatically identify words within a sentence that are considered complex or difficult for a language learner.
2.  **Synonym Generation:** For each identified complex word, the AI should provide at least one synonym that fits the context of the sentence.
3.  **Background Processing:** The extraction should occur in the background, sentence-by-sentence, without blocking the user interface.
4.  **Persistence:** The resulting word-synonym pairs must be saved to `localStorage`, associated with the specific sentence.
5.  **No UI Display:** At this stage, the synonyms should NOT be displayed in the user interface. The focus is purely on extraction and persistence.

## Non-Functional Requirements
-   **Performance:** Background tasks should not degrade the application's responsiveness.
-   **Storage Efficiency:** The data stored in `localStorage` should be structured efficiently.
-   **Error Handling:** If the AI fails to generate synonyms or if there are no complex words, the process should handle this gracefully (e.g., store an empty array or skip).

## Acceptance Criteria
-   [ ] A new service or method in `src/services/mistral.ts` exists to fetch synonyms for complex words in a sentence.
-   [ ] Background logic (similar to sentiment analysis) is updated to trigger synonym extraction.
-   [ ] For each sentence in a text, a list of `{ original: string, synonym: string }` objects is saved in `localStorage`.
-   [ ] Verified that the UI remains responsive during the background loading process.
-   [ ] Verified that synonyms are correctly saved even if only some sentences have complex words.

## Out of Scope
-   Displaying synonyms in the UI.
-   User-triggered synonym fetching (it's purely background/automatic).
-   Multiple synonyms per word (one is sufficient for now).
