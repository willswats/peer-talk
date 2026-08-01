<script lang="ts">
	import { SvgMicLine, SvgMicOffLine } from '$lib/components/svg';
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
		<span class="svg-container--small">
			<SvgMicLine />
		</span>
	{:else}
		<span class="svg-container--small">
			<SvgMicOffLine />
		</span>
	{/if}
</Button>
