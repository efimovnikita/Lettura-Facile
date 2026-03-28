# Implementation Plan: Add Listen Button (Mistral TTS)

## Phase 1: Service Integration
- [ ] Task: Add `getTextToSpeech` to `src/services/mistral.ts`.
    - [ ] Implement the call to Mistral AI's TTS endpoint.
    - [ ] Handle API responses and potential errors.
- [ ] Task: Add unit test for `getTextToSpeech` in `src/services/mistral.test.ts`.

## Phase 2: UI Implementation
- [ ] Task: Update `App.tsx` to include the "Listen" button.
    - [ ] Add state for tracking audio playback (`isPlaying`, `audioUrl`).
    - [ ] Implement `handleListen` function to fetch and play audio.
    - [ ] Add the button to the bottom controls area.
    - [ ] Style the "Next Sentence" and "Listen" buttons for proper alignment and width.
- [ ] Task: Ensure the button uses `Volume2` and `Square` icons from `lucide-react`.

## Phase 3: Refinement and Verification
- [ ] Task: Add loading state for the "Listen" button.
- [ ] Task: Verify playback on different sentences and display modes (original/simplified).
- [ ] Task: Ensure audio is stopped when navigating to the next/previous sentence.
- [ ] Task: Conductor - User Manual Verification 'Refinement and Verification' (Protocol in workflow.md)
