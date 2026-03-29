# Implementation Plan: Mistral Voice Selection (mistral_voice_selection_20260329)

## Phase 1: Service Integration [checkpoint: f1eb67a]
- [x] Task: Update `mistral.ts` service to fetch available voices from the Mistral API. [471b4af]
    - [x] Add `fetchVoices` function to `src/services/mistral.ts`.
    - [x] Define the response type for the voices list according to the Mistral documentation.
- [x] Task: Update TTS request in `mistral.ts` to accept an optional `voice_id` parameter. [471b4af]
    - [x] Update the payload of the `textToSpeech` call in `src/services/mistral.ts` to include the `voice` field.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Service Integration' (Protocol in workflow.md) [f1eb67a]

## Phase 2: State and Settings UI
- [ ] Task: Update `App.tsx` and `SettingsPanel.tsx` to manage the selected voice state.
    - [ ] Add `selectedVoice` state to the main application state and ensure it persists in `localStorage`.
    - [ ] Fetch the list of available voices when the `mistralKey` changes or the app loads.
- [ ] Task: Implement the "Voce" (Voice) selection dropdown in `SettingsPanel.tsx`.
    - [ ] Add a new section in the settings panel for voice selection.
    - [ ] Render a `<select>` element populated with the fetched voices.
    - [ ] Ensure the dropdown is only visible when a valid Mistral API key is set.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: State and Settings UI' (Protocol in workflow.md)

## Phase 3: Verification and Finalization
- [ ] Task: Verify the voice selection affects the TTS output.
    - [ ] Test with different voices to confirm the audio output changes accordingly.
- [ ] Task: Handle error states (e.g., API failures when fetching voices).
    - [ ] Display a "Could not load voices" message if the API call fails.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification and Finalization' (Protocol in workflow.md)
