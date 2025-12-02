<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	import Chat from '$lib/components/Chat.svelte';
	import Video from '$lib/components/Video.svelte';

	// Global state
	let pc: RTCPeerConnection | null = null;
	const room = 'default-room';

	const socket = io();
	socket.on('eventFromServer', (message) => {
		console.log(message);
	});
	socket.emit('join-room', room);

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
</script>

<Video {pc} {room} {socket} />
