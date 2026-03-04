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
				videoElement.style.position = 'absolute';
				videoElement.style.width = '0';
				videoElement.style.height = '0';
				videoElement.style.opacity = '0';
				videoElement.style.pointerEvents = 'none';
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
		background-color: #000;
		border-radius: 25px;
	}
</style>
