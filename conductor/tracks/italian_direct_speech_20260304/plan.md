# Implementation Plan: Correct Sentence Splitting for Direct Speech (Italian Focus)

**Phase 1: Research and Test Foundation (Italian Direct Speech)**
- [x] Task: Create `src/utils.test.ts` with comprehensive test cases for `splitIntoSentences` focusing on Italian direct speech scenarios.
    - [x] Add tests for Italian-style dialogue (dashes, quotes).
    - [x] Add tests for speech + attribution units in Italian.
    - [x] Add tests for multiple sentences within a single dialogue line in Italian.
- [x] Task: Verify that the new tests fail as expected (Red Phase).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Research and Test Foundation (Italian Direct Speech)' (Protocol in workflow.md)

**Phase 2: Implementation of Enhanced Splitting Logic**
- [x] Task: Update `splitIntoSentences` in `src/utils.ts` to handle dialogue attribution and independent sentences in dialogue.
    - [x] Refine the regex to correctly identify terminal punctuation within Italian dialogue.
    - [x] Implement logic to keep attribution (starting with lowercase or after a dash) with its preceding speech.
    - [x] Ensure terminal punctuation followed by a capital letter still triggers a split even within dialogue.
- [x] Task: Verify that all tests pass (Green Phase).
- [ ] Task: Refactor the regex and splitting logic for better readability and maintainability.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation of Enhanced Splitting Logic' (Protocol in workflow.md)

**Phase 3: Quality Assurance and Coverage**
- [ ] Task: Run the full test suite and ensure code coverage for `src/utils.ts` is >80%.
- [ ] Task: Verify the UI correctly renders the newly split sentences by manually testing with the provided Italian examples.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Quality Assurance and Coverage' (Protocol in workflow.md)
