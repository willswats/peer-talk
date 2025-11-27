<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	// Global state
	let pc: RTCPeerConnection | null = null;
	let localStream: MediaStream | null = $state(null);
	let remoteStream: MediaStream | null = $state(null);
	const room = 'default-room';
	let messageContainer: HTMLParagraphElement | null = null;
	let messageInput: HTMLInputElement | null = null;

	const socket = io();
	socket.on('eventFromServer', (message) => {
		console.log(message);
	});
	socket.emit('join-room', room);

	function getTime() {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function appendMessage(text: string, type: string, timestamp: string) {
		const messageElement = document.createElement('div');
		messageElement.classList.add(type); // 'sent' or 'received'
		messageElement.innerText = text;

		const timestampElement = document.createElement('div');
		timestampElement.classList.add('timestamp');
		timestampElement.innerText = timestamp;

		messageElement.appendChild(timestampElement);
		messageContainer!.appendChild(messageElement);
	}

	function appendSystemMessage(text: string) {
		const systemMessage = document.createElement('div');
		systemMessage.classList.add('system-message');
		systemMessage.innerText = text;
		messageContainer!.appendChild(systemMessage);
	}

	function handleMessageSubmit(event: SubmitEvent) {
		event.preventDefault();

		const message = messageInput!.value;

		// Show the message in your chat window
		appendMessage(`You: ${message}`, 'sent', getTime());

		// Send the message to the server
		socket.emit('send-chat-message', message);

		// Clear the input box
		messageInput!.value = '';
	}

	onMount(async () => {
		const name = window.prompt('What is your name?');
		socket.emit('new-user', name);

		socket.on('chat-message', (data) => {
			appendMessage(`${data.name}: ${data.message}`, 'received', data.time);
		});

		// Notify when a user connects to the chat
		socket.on('user-connected', (name) => {
			appendSystemMessage(`${getTime()} - ${name} joined`);
		});

		// Notify when a user disconnects from the chat
		socket.on('user-disconnected', (name) => {
			appendSystemMessage(`${getTime()} - ${name} disconnected`);
		});

		const getIceServers = async () => {
			const response = await fetch(
				`https://peer-talk.metered.live/api/v1/turn/credentials?apiKey=${import.meta.env.VITE_METERED_API_KEY}`
			);
			const iceServers = await response.json();
			return iceServers;
		};

		const iceServers = await getIceServers();
		pc = new RTCPeerConnection(iceServers);

		pc!.onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit('ice-candidate', event.candidate, room, socket.id);
			}
		};

		// Listen for ICE candidates
		socket.on('ice-candidate', (candidate) => {
			if (pc!.currentRemoteDescription) {
				const iceCandidate = new RTCIceCandidate(candidate);
				pc!.addIceCandidate(iceCandidate);
			}
		});

		// Listen for answers
		socket.on('answer', async (answer) => {
			console.log('Received answer');
			if (!pc!.currentRemoteDescription) {
				const answerDescription = new RTCSessionDescription(answer);
				await pc!.setRemoteDescription(answerDescription);
				console.log('Remote description set from answer');
			}

			console.log(remoteStream);
			console.log('active?', remoteStream?.active);
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
		console.log('Offer sent to room');
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

<p bind:this={messageContainer} id="message-container"></p>
<form onsubmit={handleMessageSubmit} id="send-container">
	<input bind:this={messageInput} id="message-input" />
</form>
