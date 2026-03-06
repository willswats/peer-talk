<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { peerState, resetPeerState, resetUserState } from '$lib/state.svelte';
	import HangUp from '$lib/components/svg/HangUp.svelte';

	function handleOnClickDisconnect() {
		peerState.socket.disconnect();
		resetUserState();
		resetPeerState();
		goto(resolve('/'));
	}
</script>

<button onclick={handleOnClickDisconnect}><HangUp width={24} height={24} /></button>

<style>
	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}
</style>
