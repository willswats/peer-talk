<script lang="ts">
	import MicLine from '$lib/components/svg/MicLine.svelte';
	import MicOffLine from '$lib/components/svg/MicOffLine.svelte';
	import { userState } from '$lib/state.svelte';
	import { toggleLocalAudio } from '$lib/utils/userActions';
	import { Button } from '$lib/components/Buttons';
</script>

<Button
	onclick={() => {
		userState.localMicEnabled = toggleLocalAudio(userState.localStream, userState.localMicEnabled);
	}}
>
	{#if userState.localMicEnabled}
		<MicLine width={24} height={24} />
	{:else}
		<MicOffLine width={24} height={24} />
	{/if}
</Button>
