<script lang="ts">
	import VideoVolume from '$lib/components/VideoVolume.svelte';

	interface Props {
		username: string;
		videoStream: MediaStream | undefined;
		muted: boolean;
		showUsername: boolean;
	}

	let { username, videoStream, muted, showUsername }: Props = $props();

	let videoElement: HTMLVideoElement | null = $state(null);
	let hasVideo = $state(false);

	$effect(() => {
		if (videoStream && videoElement) {
			videoElement.srcObject = videoStream;
			hasVideo = videoStream.getVideoTracks().length > 0;
		}
	});
</script>

<div id="video-container">
	<video
		class:hidden={!hasVideo}
		bind:this={videoElement}
		autoplay
		playsinline
		controls={false}
		{muted}
	>
		<track kind="captions" />
	</video>
	{#if showUsername}
		{#if !hasVideo}
			<span class="username-no-video">{username}</span>
		{:else}
			<span class="username-video">{username}</span>
		{/if}
	{/if}
	{#if !muted}
		<div id="volume-container">
			<VideoVolume {videoElement} />
		</div>
	{/if}
</div>

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
		overflow: hidden;
	}

	.username-video {
		font-size: 1rem;
		background-color: var(--bg-tertiary-opaque);
		border-radius: var(--border-radius-large);
		padding: 0.5rem;
		overflow: hidden;
		border: 1px solid var(--border);
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
	}

	.username-no-video {
		font-size: 1.2rem;
		background-color: var(--bg-tertiary-opaque);
		border-radius: var(--border-radius-large);
		padding: 1rem;
		overflow: hidden;
		border: 1px solid var(--border);
	}

	@media screen and (max-width: 768px) {
		.username-no-video {
			font-size: 1rem;
		}
	}
</style>
