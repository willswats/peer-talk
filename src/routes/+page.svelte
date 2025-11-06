<script lang="ts">
	import { onMount } from 'svelte';
	import { METERED_USERNAME, METERED_CREDENTIAL } from '$env/static/private';

	const servers = {
		iceServers: [
			{
				urls: 'stun:stun.relay.metered.ca:80'
			},
			{
				urls: 'turn:standard.relay.metered.ca:80',
				username: `${METERED_USERNAME}`,
				credential: `${METERED_CREDENTIAL}`
			},
			{
				urls: 'turn:standard.relay.metered.ca:80?transport=tcp',
				username: `${METERED_USERNAME}`,
				credential: `${METERED_CREDENTIAL}`
			},
			{
				urls: 'turn:standard.relay.metered.ca:443',
				username: `${METERED_USERNAME}`,
				credential: `${METERED_CREDENTIAL}`
			},
			{
				urls: 'turns:standard.relay.metered.ca:443?transport=tcp',
				username: `${METERED_USERNAME}`,
				credential: `${METERED_CREDENTIAL}`
			}
		]
	};

	let pc = new RTCPeerConnection(servers);

	let localVideo: HTMLVideoElement | null = null;
	let remoteVideo: HTMLVideoElement | null = null;

	onMount(async () => {
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
