<script lang="ts">
	import { SvgVolumeUpLine, SvgVolumeMuteLine } from '$lib/components/svg';
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
		<span class="svg-container--small">
			<SvgVolumeMuteLine />
		</span>
	{:else}
		<span class="svg-container--small">
			<SvgVolumeUpLine />
		</span>
	{/if}
</Button>
