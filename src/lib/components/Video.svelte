<script lang="ts">
	import { onMount } from 'svelte';
	import type { Socket } from 'socket.io-client';

	interface Props {
		pc: RTCPeerConnection | null;
		room: string | undefined;
		socket: Socket;
	}

	let { pc, room, socket }: Props = $props();

	let localStream: MediaStream | null = $state(null);
	let remoteStream: MediaStream | null = $state(null);

	// HTML elements
	let localVideo: HTMLVideoElement | null = null;
	let remoteVideo: HTMLVideoElement | null = null;

	onMount(async () => {
		// Listen for answers
		socket.on('answer', async (answer) => {
			console.log('Received answer');
			try {
				if (pc === null) throw new Error('Error: peer connection is null');

				if (!pc.currentRemoteDescription) {
					const answerDescription = new RTCSessionDescription(answer);
					await pc.setRemoteDescription(answerDescription);
					console.log('Remote description set from answer');
				}
			} catch (error) {
				console.error('Error handling answer:', error);
			}
		});

		// Listen for offers from callers
		socket.on('offer', async (offer, socketId) => {
			console.log('offer event received');
			try {
				if (pc === null) throw new Error('Error: peer connection is null');

				await pc.setRemoteDescription(new RTCSessionDescription(offer));
				console.log('Remote description set from offer');

				const answer = await pc.createAnswer();
				await pc.setLocalDescription(answer);
				console.log('Answer created and set as local description');

				socket.emit('answer', pc.localDescription, room, socketId);
				console.log('Answer sent to:', socketId);
			} catch (error) {
				console.error('Error handling offer:', error);
			}
		});
	});

	async function handleWebCamButtonClick() {
		try {
			if (pc === null) throw new Error('Error: peer connection is null');

			const constraints = { video: true, audio: true };
			localStream = await navigator.mediaDevices.getUserMedia(constraints);
			remoteStream = new MediaStream();

			// Push audio/video to the peer connection
			localStream.getTracks().forEach((track) => {
				pc.addTrack(track, localStream!);
			});

			// Pull tracks from remote stream, add to video stream
			pc.ontrack = (event) => {
				event.streams[0].getTracks().forEach((track) => {
					if (remoteStream === null) throw new Error('Error: remote stream is null');

					remoteStream.addTrack(track);
				});
			};

			console.log('Got MediaStream:', localStream);
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	}

	async function handleJoinRoomButtonClick() {
		// Create and send offer
		if (pc === null) throw new Error('Error: peer connection is null');

		const offerDescription = await pc.createOffer();
		await pc.setLocalDescription(offerDescription);
		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type
		};

		socket.emit('offer', offer, room);
	}

	$effect(() => {
		if (localVideo !== null && remoteVideo !== null) {
			localVideo.srcObject = localStream;
			remoteVideo.srcObject = remoteStream;
		}
	});
</script>

<section id="videos-container">
	<video bind:this={localVideo} id="local-video" autoplay playsinline controls={false}>
		<track kind="captions" />
	</video>
	<video bind:this={remoteVideo} id="remote-video" autoplay playsinline controls={false}>
		<track kind="captions" />
	</video>
</section>

<section id="buttons-container">
	<button onclick={handleWebCamButtonClick} id="webcam-button">Webcam</button>
	<button onclick={handleJoinRoomButtonClick} id="join-button">Join Room</button>
	<button id="disconnect-button">Disconnect</button>
</section>

<style>
	#videos-container {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	video:first-of-type {
		margin-right: 1rem;
	}

	video {
		border-radius: 20px;
		border: 5px solid #2a2a2a;
	}

	#buttons-container {
		display: flex;
		margin-bottom: 1rem;
	}

	button {
		color: #fff;
		background-color: #2a2a2a;
		font-size: 1.5rem;
		border-radius: 20px;
		padding: 1rem;
		margin-right: 0.5rem;
	}

	button:hover {
		background-color: #3a3a3a;
	}
</style>
