import { userState } from '$lib/state.svelte';

export function toggleLocalAudio() {
	if (userState.localStream !== null) {
		userState.localMicEnabled = !userState.localMicEnabled;
		userState.localStream.getAudioTracks()[0].enabled = userState.localMicEnabled;
	}
}
