<script lang="ts">
	import { SvgVideoOnLine, SvgVideoOffLine } from '$lib/components/svg';
	import { userState } from '$lib/state.svelte';
	import { Button } from '$lib/components/Buttons';

	function toggleLocalVideo() {
		if (userState.localStream !== undefined && userState.localStream?.getVideoTracks().length > 0) {
			userState.localVideoEnabled = !userState.localVideoEnabled;
			userState.localStream.getVideoTracks()[0].enabled = userState.localVideoEnabled;
		}
	}
</script>

<Button onclick={toggleLocalVideo}>
	{#if userState.localVideoEnabled}
		<span class="svg-container--small">
			<SvgVideoOnLine />
		</span>
	{:else}
		<span class="svg-container--small">
			<SvgVideoOffLine />
		</span>
	{/if}
</Button>
