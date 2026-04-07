<script lang="ts">
	interface Props {
		username: string;
		videoStream: MediaStream | null;
		muted: boolean;
	}

	let { username, videoStream, muted }: Props = $props();

	let videoElement: HTMLVideoElement;
	let hasVideo = $state(false);

	$effect(() => {
		if (videoStream) {
			videoElement.srcObject = videoStream;

			hasVideo = videoStream.getVideoTracks().length > 0;
			if (!hasVideo) {
				videoElement.classList.add('hidden');
			}
		}
	});
</script>

<video bind:this={videoElement} autoplay playsinline controls={false} {muted}>
	<track kind="captions" />
</video>
{#if !hasVideo}
	<div>
		<span>{username}</span>
	</div>
{/if}

<style>
	video {
		width: 100%;
		height: 100%;
		background-color: var(--background-color, var(--mantle));
		border-radius: var(--border-radius-normal);
		min-width: 0;
		min-height: 0;
	}

	div {
		width: 100%;
		height: 100%;
		background-color: var(--background-color, var(--mantle));
		border-radius: var(--border-radius-normal);
		min-width: 0;
		min-height: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	span {
		font-size: 2rem;
		background-color: var(--crust);
		border-radius: var(--border-radius-large);
		padding: 2rem;
		overflow: hidden;
	}

	@media screen and (max-width: 768px) {
		span {
			font-size: 1rem;
		}
	}
</style>
