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
		width: 100%;
		height: 100%;
		background-color: #000;
		border-radius: 25px;
	}
</style>
