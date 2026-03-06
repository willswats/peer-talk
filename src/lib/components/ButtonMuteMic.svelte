<script lang="ts">
	import MicLine from '$lib/components/svg/MicLine.svelte';
	import MicOffLine from '$lib/components/svg/MicOffLine.svelte';
	import { userState } from '$lib/state.svelte';

	function toggleLocalAudio() {
		if (userState.localStream !== null) {
			userState.localMicEnabled = !userState.localMicEnabled;
			userState.localStream.getAudioTracks()[0].enabled = userState.localMicEnabled;
		}
	}
</script>

<button onclick={toggleLocalAudio}>
	{#if userState.localMicEnabled}
		<MicLine width={24} height={24} />
	{:else}
		<MicOffLine width={24} height={24} />
	{/if}
</button>

<style>
	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}
</style>
