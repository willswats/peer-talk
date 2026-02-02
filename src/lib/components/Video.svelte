<script lang="ts">
	interface Props {
		videoStream: MediaStream | null;
		videoElement: HTMLVideoElement | null;
	}

	let { videoStream, videoElement }: Props = $props();

	$effect(() => {
		if (videoElement !== null) {
			videoElement.srcObject = videoStream;
		}
	});
</script>

<video bind:this={videoElement} autoplay playsinline controls={false}>
	<track kind="captions" />
</video>
