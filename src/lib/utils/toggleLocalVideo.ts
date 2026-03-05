import { userState } from '$lib/state.svelte';

export function toggleLocalVideo() {
	if (userState.localStream !== null) {
		userState.localVideoEnabled = !userState.localVideoEnabled;
		userState.localStream.getVideoTracks()[0].enabled = userState.localVideoEnabled;
	}
}
