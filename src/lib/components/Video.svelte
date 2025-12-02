<script lang="ts">
	import { io } from 'socket.io-client';

	interface Props {
		pc: RTCPeerConnection | null;
		room: String;
	}

	let { pc, room }: Props = $props();

	const socket = io();

	let localStream: MediaStream | null = $state(null);
	let remoteStream: MediaStream | null = $state(null);

	// HTML elements
	let localVideo: HTMLVideoElement | null = null;
	let remoteVideo: HTMLVideoElement | null = null;

	async function handleWebCamButtonClick() {
		try {
			const constraints = { video: true, audio: true };
			localStream = await navigator.mediaDevices.getUserMedia(constraints);
			remoteStream = new MediaStream();

			// Push audio/video to the peer connection
			localStream.getTracks().forEach((track) => {
				pc!.addTrack(track, localStream!);
			});

			// Pull tracks from remote stream, add to video stream
			pc!.ontrack = (event) => {
				event.streams[0].getTracks().forEach((track) => {
					remoteStream!.addTrack(track);
				});
			};

			console.log('Got MediaStream:', localStream);
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	}

	async function handleCallButtonClick() {
		// Create and send offer
		const offerDescription = await pc!.createOffer();
		await pc!.setLocalDescription(offerDescription);
		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type
		};

		socket.emit('offer', offer, room);
	}

	async function handleAnswerButtonClick() {}

	$effect(() => {
		console.log('CHANGE!');
		localVideo!.srcObject = localStream;
		remoteVideo!.srcObject = remoteStream;
		// console.log(localVideo?.srcObject);
		// console.log(remoteVideo?.srcObject);
	});
</script>

<button onclick={handleWebCamButtonClick} id="webcam-button">Webcam</button>
<button onclick={handleCallButtonClick} id="call-button">Call</button>
<button onclick={handleAnswerButtonClick} id="answer-button">Answer</button>
<button id="hangup-button">Hangup</button>

<video bind:this={localVideo} id="local-video" autoplay playsinline controls={false}>
	<track kind="captions" />
</video>
<video bind:this={remoteVideo} id="remote-video" autoplay playsinline controls={false}>
	<track kind="captions" />
</video>
