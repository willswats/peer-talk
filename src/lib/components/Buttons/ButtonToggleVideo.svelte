<script lang="ts">
	import VideoOnLine from '$lib/components/svg/VideoOnLine.svelte';
	import VideoOffLine from '$lib/components/svg/VideoOffLine.svelte';
	import { userState } from '$lib/state.svelte';
	import { Button } from '$lib/components/Buttons';

	function toggleLocalVideo() {
		if (userState.localStream !== null && userState.localStream?.getVideoTracks().length > 0) {
			userState.localVideoEnabled = !userState.localVideoEnabled;
			userState.localStream.getVideoTracks()[0].enabled = userState.localVideoEnabled;
		}
	}
</script>

<Button onclick={toggleLocalVideo}>
	{#if userState.localVideoEnabled}
		<VideoOnLine width={24} height={24} />
	{:else}
		<VideoOffLine width={24} height={24} />
	{/if}
</Button>
