import { resolve } from '$app/paths';
import { goto } from '$app/navigation';
import { peerState, resetPeerState, resetUserState } from '$lib/state.svelte';

export function disconnectUser() {
	if (confirm('Are you sure you want to disconnect from this room?')) {
		peerState.socket.disconnect();
		resetUserState();
		resetPeerState();
		goto(resolve('/'));
	}
}
