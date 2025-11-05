<script lang="ts">
	import { onMount } from 'svelte';

	let video: HTMLVideoElement | null = null;

	onMount(async () => {
		try {
			const constraints = { video: true, audio: true };
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			if (video != null) {
				video.srcObject = stream;
			}
			console.log('Got MediaStream:', stream);
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	});
</script>

<video bind:this={video} id="local-video" autoplay playsinline controls={false}>
	<track kind="captions" />
</video>
