# Implementation Plan: Font & Spacing Upgrade

## Phase 1: Infrastructure and Font Setup
- [x] Task: Integrate "Merriweather" Google Font in `index.html`. c772d6e
- [x] Task: Extend Tailwind CSS configuration to include Merriweather as the primary serif font. 2ab438f
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Component Refactoring (TDD)
- [x] Task: Update `WordRenderer.test.tsx` to include checks for responsive word spacing. a826c31
- [x] Task: Update `WordRenderer.tsx` replacing fixed `mr-1` with relative `mr-[0.3em]`. a826c31
- [ ] Task: Update `SentenceDisplay.tsx` styling (if necessary) to ensure font compatibility.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Visual Polish and Verification
- [ ] Task: Verify that the font looks correct across all display modes (Original, Simplified, Translated).
- [ ] Task: Ensure the "Sentiment" and "Synonym" icons/text align correctly with the new font.
- [ ] Task: Final cross-device manual check (Mobile/Desktop).
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
