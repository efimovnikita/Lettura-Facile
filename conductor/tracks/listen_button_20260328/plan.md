# Implementation Plan: Add Listen Button (Mistral TTS)

## Phase 1: Service Integration [checkpoint: 3c094b2]
- [x] Task: Add `getTextToSpeech` to `src/services/mistral.ts` aff85df (service), 6f1f866 (UI).
    - [ ] Implement the call to Mistral AI's TTS endpoint based on this example:
      ```typescript
      const audio = await client.audio.speech.complete({
        model: "voxtral-mini-tts-2603",
        input: "...",
        responseFormat: "mp3",
        stream: false,
        voiceId: "c48524bb-3f27-4fd9-863c-c63c26564b04",
      });
      // audio.audioData is a base64 string
      const binary = atob(audio.audioData);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      ```
    - [ ] Handle API responses and potential errors.
- [x] Task: Add unit test for `getTextToSpeech` in `src/services/mistral.test.ts` aff85df (service), 6f1f866 (UI).

## Phase 2: UI Implementation [checkpoint: 573e416]
- [x] Task: Update `App.tsx` to include the "Listen" button aff85df (service), 6f1f866 (UI).
    - [x] Add state for tracking audio playback (`isPlaying`, `audioUrl`).
    - [x] Implement `handleListen` function to fetch and play audio.
    - [x] Add the button to the bottom controls area.
    - [x] Implement visibility logic: button is available ONLY in `original` and `simplified` modes (NOT in `translated` mode).
    - [x] Style the "Next Sentence" and "Listen" buttons for proper alignment and width.
- [x] Task: Ensure the button uses `Volume2` and `Square` icons from `lucide-react` aff85df (service), 6f1f866 (UI).

## Phase 3: Refinement and Verification [checkpoint: 573e416]
- [x] Task: Add loading state for the "Listen" button 573e416.
- [x] Task: Verify playback on different sentences and display modes (original/simplified) 573e416.
- [x] Task: Ensure audio is stopped when navigating to the next/previous sentence 573e416.
- [ ] Task: Conductor - User Manual Verification 'Refinement and Verification' (Protocol in workflow.md)
