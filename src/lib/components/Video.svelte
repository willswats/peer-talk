<script lang="ts">
	import VideoVolume from '$lib/components/VideoVolume.svelte';

	interface Props {
		username: string;
		videoStream: MediaStream | null;
		muted: boolean;
	}

	let { username, videoStream, muted }: Props = $props();

	let videoElement: HTMLVideoElement | null = $state(null);
	let hasVideo = $state(false);

	$effect(() => {
		if (videoStream && videoElement) {
			videoElement.srcObject = videoStream;
			hasVideo = videoStream.getVideoTracks().length > 0;
		}
	});
</script>

<div class:hidden={!hasVideo} id="video-container">
	<video bind:this={videoElement} autoplay playsinline controls={false} {muted}>
		<track kind="captions" />
	</video>
	{#if !muted}
		<VideoVolume {videoElement} />
	{/if}
</div>
{#if !hasVideo}
	<div id="video-container">
		<span>{username}</span>
		{#if !muted}
			<VideoVolume {videoElement} />
		{/if}
	</div>
{/if}

<style>
	video {
		width: 100%;
		height: 100%;
	}

	#video-container {
		width: 100%;
		height: 100%;
		background-color: var(--background-color, var(--bg-secondary));
		border-radius: var(--border-radius-normal);
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--border);
		position: relative;
	}

	span {
		font-size: 2rem;
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-large);
		padding: 1rem;
		overflow: hidden;
		border: 1px solid var(--border);
	}

	@media screen and (max-width: 768px) {
		span {
			font-size: 1rem;
		}
	}
</style>
