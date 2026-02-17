<script lang="ts">
	interface Props {
		videoStream: MediaStream | null;
	}

	let { videoStream }: Props = $props();

	let videoElement: HTMLVideoElement;

	$effect(() => {
		videoElement.srcObject = videoStream;
	});
</script>

<video bind:this={videoElement} autoplay playsinline controls={false}>
	<track kind="captions" />
</video>

<style>
	video {
		background-color: #000;
	}
</style>
