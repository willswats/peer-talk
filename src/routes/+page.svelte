<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	const socket = io();
	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	// Global state
	let pc: RTCPeerConnection | null = null;
	let localStream: MediaStream | null = null;
	let remoteStream: MediaStream | null = null;
	const room = 'default-room';

	onMount(async () => {
		const getIceServers = async () => {
			const response = await fetch(
				`https://peer-talk.metered.live/api/v1/turn/credentials?apiKey=${import.meta.env.VITE_METERED_API_KEY}`
			);
			const iceServers = await response.json();
			return iceServers;
		};

		const iceServers = await getIceServers();
		pc = new RTCPeerConnection(iceServers);
	});

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

			localVideo!.srcObject = localStream;
			remoteVideo!.srcObject = remoteStream;

			console.log('Got MediaStream:', localStream);
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	}

	async function handleCallButtonClick() {
		socket.emit('join-room', room);

		pc!.onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit('ice-candidate', event.candidate, room, socket.id);
			}
		};

		// Create and send offer
		const offerDescription = await pc!.createOffer();
		await pc!.setLocalDescription(offerDescription);
		socket.emit('offer', pc!.localDescription, room);
		console.log('Offer sent to room');

		// Listen for answers (caller only needs to listen for answers)
		socket.on('answer', async (answer) => {
			console.log('Received answer');
			await pc!.setRemoteDescription(new RTCSessionDescription(answer));
			console.log('Remote description set from answer');
		});

		// Listen for ICE candidates
		socket.on('ice-candidate', (candidate) => {
			pc!.addIceCandidate(new RTCIceCandidate(candidate));
		});
	}

	async function handleAnswerButtonClick() {
		socket.emit('join-room', room);

		pc!.onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit('ice-candidate', event.candidate, room, socket.id);
			}
		};

		// Listen for ICE candidates
		socket.on('ice-candidate', (candidate) => {
			pc!.addIceCandidate(new RTCIceCandidate(candidate));
		});

		// Listen for offers from callers
		socket.on('offer', async (offer, socketId) => {
			console.log('offer event received');
			try {
				await pc!.setRemoteDescription(new RTCSessionDescription(offer));
				console.log('Remote description set from offer');

				const answer = await pc!.createAnswer();
				await pc!.setLocalDescription(answer);
				console.log('Answer created and set as local description');

				socket.emit('answer', pc!.localDescription, room, socketId);
				console.log('Answer sent to:', socketId);
			} catch (error) {
				console.error('Error handling offer:', error);
			}
		});
	}
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
