# Specification: Mistral Voice Selection Settings (mistral_voice_selection_20260329)

## Overview
This track introduces the ability for users to select a specific voice for the Text-to-Speech (TTS) feature when a Mistral API key is provided. The app will dynamically fetch available voices from the Mistral API and allow the user to choose their preferred voice in the settings panel.

## Functional Requirements
- **Dynamic Voice Fetching**: The app must fetch the list of available voices from the Mistral TTS API (as per [Mistral documentation](https://docs.mistral.ai/capabilities/audio/text_to_speech/voices?tab=list#explorer-tabs-tts-voices)).
- **Voice Selection UI**: Add a dropdown (select) menu in the "Impostazioni" (Settings) panel to choose a voice from the fetched list.
- **Persistence**: The selected voice ID must be saved in `localStorage` so it persists across sessions.
- **Fallback Behavior**: If no voices can be fetched (e.g., API error, invalid key), the TTS feature should be disabled or show a clear error state, as it relies on the Mistral API.
- **Integration with TTS**: The `mistral.ts` service must be updated to use the selected voice ID when making TTS requests.

## Non-Functional Requirements
- **Robustness**: Gracefully handle cases where the voice list cannot be loaded.
- **Performance**: Fetch the voice list once per session or cache it to avoid redundant API calls.

## Acceptance Criteria
- [ ] Settings panel shows a "Voce" (Voice) dropdown when a Mistral API key is present.
- [ ] The dropdown is populated with voices fetched from the Mistral API.
- [ ] Changing the voice in the settings immediately updates the voice used for text-to-speech.
- [ ] The selected voice is remembered after refreshing the page.
- [ ] If the API key is removed or invalid, the voice selection is hidden or disabled.

## Out of Scope
- Voice samples/previews (as per user preference).
- Custom voice cloning or advanced audio parameters.
