<script lang="ts">
	import { io } from 'socket.io-client';
	import { getIceServers } from '$lib/utils/getIceServers';

	import Video from './Video.svelte';
	import Chat from './Chat.svelte';

	// Global state
	interface peers {
		[key: string]: RTCPeerConnection;
	}

	let peers: peers = {};
	let remoteStreams: MediaStream[] = $state([]);

	const socket = io();

	interface Props {
		roomId: string | undefined;
		username: string;
		localMicStream: MediaStream | null;
		localVideoStream: MediaStream | null;
	}

	const { username, roomId, localMicStream, localVideoStream }: Props = $props();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	socket.emit('join-room', roomId, username);

	socket.on('user-connected', async (socketId) => {
		try {
			console.log('User connected:', socketId);

			const pc = createPeerConnection(socketId);

			const offerDescription = await pc.createOffer();
			await pc.setLocalDescription(offerDescription);

			socket.emit('signal', { target: socketId, signal: pc.localDescription });
		} catch (error) {
			console.log('Error creating offer:', error);
		}
	});

	// Handle the reception of a signal (offer, answer, ICE candidate)
	socket.on('signal', async (data) => {
		const { signal, from } = data;

		if (!peers[from]) {
			console.log('Creating peer connection for user:', from);
			createPeerConnection(from);
		}

		if (signal.candidate) {
			console.log('Received ICE candidate from user:', from);
			try {
				const iceCandidate = new RTCIceCandidate(signal);
				peers[from].addIceCandidate(iceCandidate);
			} catch (error) {
				console.error('Error listening for ICE candidates:', error);
			}
		}

		if (signal.type === 'offer') {
			console.log('Received offer from user:', from);
			try {
				await peers[from].setRemoteDescription(new RTCSessionDescription(signal));
				console.log('Remote description set from offer');

				const answer = await peers[from].createAnswer();
				await peers[from].setLocalDescription(answer);
				console.log('Answer created and set as local description');

				socket.emit('signal', { target: from, signal: peers[from].localDescription });
				console.log('Answer sent to:', peers[from]);
			} catch (error) {
				console.error('Error handling offer:', error);
			}
		}

		if (signal.type === 'answer') {
			try {
				const answerDescription = new RTCSessionDescription(signal);
				await peers[from].setRemoteDescription(answerDescription);
			} catch (error) {
				console.error('Error handling answer:', error);
			}
		}
	});

	socket.on('user-disconnected', (socketId) => {
		console.log('User disconnected:', socketId);
		if (peers[socketId]) {
			peers[socketId].close();
			delete peers[socketId];
		}
	});

	function createPeerConnection(socketId: string) {
		// TODO: change back to other server
		const pc = new RTCPeerConnection({
			iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
		});

		if (localMicStream !== null) {
			localMicStream.getTracks().forEach((track: MediaStreamTrack) => {
				pc.addTrack(track, localMicStream);
			});
		}

		if (localVideoStream !== null) {
			localVideoStream.getTracks().forEach((track: MediaStreamTrack) => {
				pc.addTrack(track, localVideoStream);
			});
		}

		const remoteStream = new MediaStream();
		pc.ontrack = (event) => {
			event.streams[0].getTracks().forEach((track) => {
				if (remoteStream) {
					remoteStream.addTrack(track);
				}
			});
		};
		remoteStreams.push(remoteStream);

		// Handle ICE candidates
		pc.onicecandidate = (event) => {
			if (event.candidate) {
				console.log('Sending ICE candidate to user:', socketId);
				socket.emit('signal', { target: socketId, signal: event.candidate });
			}
		};

		peers[socketId] = pc; // Store the peer connection
		return pc;
	}
</script>

<main>
	<Video videoStream={localVideoStream} />
	{#each remoteStreams as remoteStream}
		<Video videoStream={remoteStream} />
	{/each}
	<Chat {socket} />
</main>

<style>
	main {
		margin: 2rem;
	}
</style>
