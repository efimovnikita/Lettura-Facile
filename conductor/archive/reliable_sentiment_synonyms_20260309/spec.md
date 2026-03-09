# Track: Reliable Sentiment and Synonym Retrieval

## Overview
This track focuses on improving the reliability of the background processes that fetch sentiment and synonyms for sentences. Currently, when a large text (many sentences) is imported, the application rapidly hits the Mistral AI rate limits, resulting in incomplete data (missing sentiment/synonyms) for some sentences.

## Problem Statement
The application performs many concurrent or rapid-fire API calls to Mistral AI upon text import. This triggers "429 Too Many Requests" errors, which are currently not handled gracefully, leading to missing linguistic data in the reader view.

## Functional Requirements
- **Background Retries**: Implement a robust retry mechanism for Mistral AI requests related to sentiment and synonym extraction.
- **Exponential Backoff**: Use an exponential backoff strategy (e.g., 1s, 2s, 4s...) to respect rate limits and increase the chance of success.
- **Silent Operation**: Retries and error handling must be completely transparent to the user. No "Retry" buttons or error banners should appear for these background tasks.
- **Persistence**: Ensure that if a request fails multiple times, it doesn't loop forever but stops after a reasonable number of attempts (e.g., 5-10 retries).

## Non-Functional Requirements
- **Performance**: The retry logic should not block the main UI thread.
- **Resilience**: The system should eventually recover and populate the data even if initial requests fail.

## Acceptance Criteria
- [ ] Mistral AI requests for sentiment and synonyms automatically retry upon receiving a rate-limit error (429).
- [ ] The retry mechanism uses exponential backoff.
- [ ] Sentences that initially failed to get sentiment/synonyms eventually display them once the background retries succeed.
- [ ] No error messages or manual retry prompts are shown to the user during this process.
- [ ] Unit tests verify the retry logic (mocking 429 errors).

## Out of Scope
- Improving the AI model's accuracy itself.
- Changing the UI layout for sentiment or synonyms.