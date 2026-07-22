<script lang="ts">
	import VolumeUpLine from '$lib/components/svg/VolumeUpLine.svelte';
	import VolumeMuteLine from '$lib/components/svg/VolumeMuteLine.svelte';
	import { userState } from '$lib/state.svelte';
	import { peerState } from '$lib/state.svelte';
	import { toggleDeafen } from '$lib/utils/userActions';
</script>

<button
	onclick={() => {
		userState.deafened = toggleDeafen(userState.deafened, peerState.remoteStreams);
	}}
>
	{#if userState.deafened}
		<VolumeMuteLine width={24} height={24} />
	{:else}
		<VolumeUpLine width={24} height={24} />
	{/if}
</button>

<style>
	button {
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}

	@media screen and (max-width: 768px) {
		button {
			padding: 0.5rem;
		}
	}
</style>
