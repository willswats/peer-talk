<script lang="ts">
	interface Props {
		videoStream: MediaStream | null;
		muted: boolean;
	}

	let { videoStream, muted }: Props = $props();

	let videoElement: HTMLVideoElement;

	$effect(() => {
		if (videoStream) {
			videoElement.srcObject = videoStream;

			const hasVideo = videoStream.getVideoTracks().length > 0;
			if (!hasVideo) {
				videoElement.classList.add('hidden');
			}
		}
	});
</script>

<video bind:this={videoElement} autoplay playsinline controls={false} {muted}>
	<track kind="captions" />
</video>

<style>
	video {
		width: 100%;
		height: 100%;
		border: 1px solid #4a4a4a;
		border-radius: 25px;
		min-width: 0;
		min-height: 0;
	}
</style>
