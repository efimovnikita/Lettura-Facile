# Specification - CEFR-Aligned Synonym Prompt

## Overview
This track aims to refine the background synonym extraction feature by aligning the AI prompt with the Common European Framework of Reference for Languages (CEFR). The goal is to focus synonym generation on words that are moderately difficult or advanced (level B1 and above), helping language learners by providing simpler alternatives for complex vocabulary.

## Functional Requirements
1.  **CEFR-Informed Extraction**:
    *   The prompt sent to Mistral AI must instruct the model to identify words in the original sentence that correspond to CEFR level B1 or higher.
    *   For these identified words, the AI must provide a contextually appropriate, simpler synonym (ideally level A1-A2).
2.  **No Metadata Requirement**:
    *   The AI response should NOT include the CEFR levels of the words. It should maintain the existing JSON structure (`{"original": "...", "synonym": "..."}`).
3.  **Prompt Refinement**:
    *   Update the `getSynonyms` prompt in `src/services/mistral.ts` to include explicit CEFR-level constraints.

## Acceptance Criteria
*   The AI prompt in `src/services/mistral.ts` contains clear instructions regarding the CEFR B1+ threshold for word selection.
*   Background synonym extraction successfully identifies complex Italian words (e.g., "perplesso", "tediato") and provides simpler synonyms.
*   Common/simple words (e.g., "casa", "gatto", "bello") are ignored for synonym generation.

## Out of Scope
*   Adding a UI setting for users to choose their own CEFR level (this is a fixed threshold for now).
*   Returning CEFR levels in the API response.
