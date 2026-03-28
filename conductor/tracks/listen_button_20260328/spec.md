# Track Specification: Add Listen Button (Mistral TTS)

## Overview
Add a "Listen" button to the reader view that allows users to hear the current Italian sentence read aloud using Mistral AI's Text-to-Speech (TTS) service.

## Functional Requirements
- **Audio Generation:** Use Mistral AI's TTS API to generate audio for the current Italian sentence.
- **UI Integration:** 
  - Place a "Listen" button (using the `Volume2` icon from `lucide-react`) to the right of the "Next Sentence" button.
  - Reduce the width of the "Next Sentence" button to accommodate the new button, especially on mobile.
- **Playback Controls:**
  - Clicking the button starts playback.
  - While playing, the icon should change to a `Square` (stop) icon.
  - Clicking the button while playing stops the audio.
- **Error Handling:** Display an error message if the TTS request fails (e.g., invalid API key, network error).

## Non-Functional Requirements
- **Performance:** Audio should start playing as soon as the first chunks are received if possible, or after a brief loading state.
- **Visual Feedback:** Show a loading state (e.g., `Loader2` or pulsing effect) while the audio is being fetched.

## Acceptance Criteria
- [ ] A "Listen" button is visible in the reader view.
- [ ] Clicking the button plays the audio of the current sentence.
- [ ] The "Next Sentence" button is slightly narrower but still functional and aesthetically pleasing.
- [ ] Playback can be stopped by clicking the button again.
- [ ] Errors are handled and reported to the user.

## Out of Scope
- Playback speed adjustment.
- Word-by-word highlighting during playback.
- Multiple voice selection (default to a standard Italian voice).
