<script lang="ts">
	import VolumeUpLine from '$lib/components/svg/VolumeUpLine.svelte';
	import VolumeMuteLine from '$lib/components/svg/VolumeMuteLine.svelte';
	import { userState } from '$lib/state.svelte';
	import { peerState } from '$lib/state.svelte';

	function toggleDeafen() {
		userState.deafened = !userState.deafened;
		if (userState.deafened) {
			// Disable remote audio streams
			for (let remoteStream of peerState.remoteStreams) {
				remoteStream.getAudioTracks()[0].enabled = false;
			}
		} else {
			// Enable remote audio streams
			for (let remoteStream of peerState.remoteStreams) {
				remoteStream.getAudioTracks()[0].enabled = true;
			}
		}
	}
</script>

<button onclick={toggleDeafen}>
	{#if userState.deafened}
		<VolumeMuteLine width={24} height={24} />
	{:else}
		<VolumeUpLine width={24} height={24} />
	{/if}
</button>

<style>
	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}

	@media screen and (max-width: 768px) {
		button {
			padding: 0.5rem;
		}
	}
</style>
