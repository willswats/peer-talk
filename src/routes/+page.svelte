<script lang="ts">
	import { onMount } from 'svelte';

	let localVideo: HTMLVideoElement | null = null;
	let remoteVideo: HTMLVideoElement | null = null;

	onMount(async () => {
		const response = await fetch(
			`https://peer-talk.metered.live/api/v1/turn/credentials?apiKey=${import.meta.env.VITE_METERED_API_KEY}`
		);
		const iceServers = await response.json();

		let pc = new RTCPeerConnection(iceServers);

		try {
			const constraints = { video: true, audio: true };
			const localStream = await navigator.mediaDevices.getUserMedia(constraints);
			const remoteStream = new MediaStream();

			// Push audio/video to the peer connection
			localStream.getTracks().forEach((track) => {
				pc.addTrack(track, localStream);
			});

			// Pull tracks from remote stream, add to video stream
			pc.ontrack = (event) => {
				event.streams[0].getTracks().forEach((track) => {
					remoteStream.addTrack(track);
				});
			};

			if (localVideo !== null && remoteVideo !== null) {
				localVideo.srcObject = localStream;
				remoteVideo.srcObject = remoteStream;
			}

			console.log('Got MediaStream:', localStream);
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	});
</script>

<video bind:this={localVideo} id="local-video" autoplay playsinline controls={false}>
	<track kind="captions" />
</video>

<video bind:this={remoteVideo} id="local-video" autoplay playsinline controls={false}>
	<track kind="captions" />
</video>
