# Track Specification: Correct Sentence Splitting for Direct Speech (Italian Focus)

**1. Overview**
Improve the `splitIntoSentences` utility to correctly handle Italian direct speech punctuation (quotes and dashes) and dialogue, specifically ensuring that dialogue attributions are kept with their respective speech while independent sentences within the same dialogue line are correctly split.

**2. Functional Requirements**
- **Dialogue Attribution:** Treat "Speech + Attribution" as a single unit when the attribution starts with a lowercase letter or follows a dash (e.g., `– Un tesoro – disse lui.`).
- **Independent Sentences in Dialogue:** Split dialogue lines into multiple sentences when they contain multiple independent clauses separated by terminal punctuation (`.?!`) followed by a capital letter, even if preceded by a dash (e.g., `– Un TESORO, baby! Il T-Rex nasconde...` should be two sentences).
- **Italian Punctuation Support:** Specifically handle Italian-style dialogue markers like dashes (`–`) and quotes.
- **Newline Handling:** Ensure that newlines replaced by spaces during processing do not prevent correct splitting.

**3. Acceptance Criteria**
- Input: `– Perché la mia nuova fiamma, la Bronty, mi ha fatto una soffiata clamorosa – disse sogghignando.`
  - Result: One sentence.
- Input: `– Un TESORO, baby! Il T-Rex nasconde un tesoro nella sua tana.`
  - Result: Two sentences:
    1. `– Un TESORO, baby!`
    2. `Il T-Rex nasconde un tesoro nella sua tana.`
- Input: `– Che tipo di soffiata?` (newline) `– Un TESORO, baby!`
  - Result: Two sentences.

**4. Out of Scope**
- Sophisticated semantic analysis of whether a verb is an attribution verb.
- Support for complex nested direct speech.
