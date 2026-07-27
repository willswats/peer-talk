<script lang="ts">
	import VolumeUpLine from '$lib/components/svg/VolumeUpLine.svelte';
	import VolumeMuteLine from '$lib/components/svg/VolumeMuteLine.svelte';
	import { userState } from '$lib/state.svelte';
	import { peerState } from '$lib/state.svelte';
	import { toggleDeafen } from '$lib/utils/userActions';
	import { Button } from '$lib/components/Buttons';
</script>

<Button
	onclick={() => {
		userState.deafened = toggleDeafen(userState.deafened, peerState.remoteStreams);
	}}
>
	{#if userState.deafened}
		<VolumeMuteLine width={24} height={24} />
	{:else}
		<VolumeUpLine width={24} height={24} />
	{/if}
</Button>
