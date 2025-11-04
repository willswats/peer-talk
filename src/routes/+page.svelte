<script lang="ts">
	import { onMount } from 'svelte';

	interface constraints {
		video: boolean;
		audio: boolean;
	}

	onMount(() => {
		const openMediaDevices = async (constraints: constraints) => {
			return await navigator.mediaDevices.getUserMedia(constraints);
		};

		try {
			const stream = openMediaDevices({ video: true, audio: true });
			console.log('Got MediaStream:', stream);
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
