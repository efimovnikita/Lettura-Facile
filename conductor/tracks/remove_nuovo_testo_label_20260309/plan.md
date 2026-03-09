# Implementation Plan: Remove 'Nuovo Testo' Label in Header

## Phase 1: Research and TDD Setup [checkpoint: ccef7cb]
- [x] Task: Identify the specific button in `src/App.tsx` that needs updating. 0cf9f26
- [x] Task: Update the existing `App.test.tsx` (or create a new test file) to assert the presence of the header button by icon/role and the absence of text. 8243b81
- [x] Task: Verify that current tests (which might rely on finding "Nuovo Testo" in the header) fail. 8243b81
- [x] Task: Conductor - User Manual Verification 'Phase 1: Research and TDD Setup' (Protocol in workflow.md) ccef7cb

## Phase 2: Implementation [checkpoint: 5aabc5d]
- [x] Task: Modify the identified button in `src/App.tsx` to remove the text label. 35df049
- [x] Task: Add `aria-label="Nuovo Testo"` and `title="Nuovo Testo"` to the button. 35df049
- [x] Task: Run tests to ensure the header button is still correctly identified by role/aria-label and that the text is gone. 35df049
- [x] Task: Conductor - User Manual Verification 'Phase 2: Implementation' (Protocol in workflow.md) 5aabc5d

## Phase 3: Final Verification
- [x] Task: Verify that other buttons labeled "Nuovo Testo" (e.g., in the reader's main content area) are unaffected. 358f47d
- [x] Task: Run full test suite with coverage report. 358f47d
- [~] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)
