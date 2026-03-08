import { resolve } from '$app/paths';
import { goto } from '$app/navigation';
import { peerState, resetPeerState, resetUserState } from '$lib/state.svelte';

export function disconnectUser() {
	peerState.socket.disconnect();
	resetUserState();
	resetPeerState();
	goto(resolve('/'));
}
