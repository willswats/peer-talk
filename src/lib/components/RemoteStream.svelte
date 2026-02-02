<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		pc: RTCPeerConnection | null;
	}

	let { pc }: Props = $props();

	let remoteStream: MediaStream | null = $state(null);
	let remoteVideoElement: HTMLVideoElement | null = $state(null);

	onMount(async () => {
		// Pull tracks from remote stream, add to video stream
		try {
			if (pc === null) throw new Error('Peer connection is null');

			remoteStream = new MediaStream();
			pc.ontrack = (event) => {
				console.log(event.streams);
				event.streams[0].getTracks().forEach((track) => {
					if (remoteStream === null) throw new Error('Remote stream is null');

					remoteStream.addTrack(track);
				});
			};
		} catch (error) {
			console.error('Error adding remote stream.', error);
		}
	});

	$effect(() => {
		if (remoteVideoElement !== null) {
			remoteVideoElement.srcObject = remoteStream;
		}
	});
</script>

<video bind:this={remoteVideoElement} id="remote-video" autoplay playsinline controls={false}>
	<track kind="captions" />
</video>
