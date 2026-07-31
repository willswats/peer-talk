<script lang="ts">
	interface Props {
		username: string;
		videoStream: MediaStream | null;
		muted: boolean;
	}

	let { username, videoStream, muted }: Props = $props();

	let videoElement: HTMLVideoElement;
	let hasVideo = $state(false);
	let volume = $state(100);

	$effect(() => {
		if (videoStream) {
			videoElement.srcObject = videoStream;
			hasVideo = videoStream.getVideoTracks().length > 0;
		}
	});

	function handleVolumeChange() {
		if (videoElement) {
			videoElement.volume = volume / 100;
		}
	}
</script>

<div class:hidden={!hasVideo}>
	<video bind:this={videoElement} autoplay playsinline controls={false} {muted}>
		<track kind="captions" />
	</video>
	{#if !muted}
		<input
			min="0"
			max="100"
			step="1"
			type="range"
			bind:value={volume}
			oninput={handleVolumeChange}
		/>
	{/if}
</div>
{#if !hasVideo}
	<div>
		<span>{username}</span>
		{#if !muted}
			<input
				min="0"
				max="100"
				step="1"
				type="range"
				bind:value={volume}
				oninput={handleVolumeChange}
			/>
		{/if}
	</div>
{/if}

<style>
	video {
		width: 100%;
		height: 100%;
	}

	div {
		width: 100%;
		height: 100%;
		background-color: var(--background-color, var(--bg-secondary));
		border-radius: var(--border-radius-normal);
		min-width: 0;
		min-height: 0;
		display: flex;
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

	input {
		position: absolute;
		bottom: 0;
		border: 0;
	}

	@media screen and (max-width: 768px) {
		span {
			font-size: 1rem;
		}
	}
</style>
