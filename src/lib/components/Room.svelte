<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { getIceServers } from '$lib/utils/getIceServers';

	import Chat from '$lib/components/Chat.svelte';
	import Video from './Video.svelte';
	import ButtonJoinRoom from '$lib/components/ButtonJoinRoom.svelte';

	// Global state
	let pc: RTCPeerConnection | null = $state(null);

	let localVideoElement: HTMLVideoElement | null = $state(null);
	let remoteStream: MediaStream | null = $state(null);
	let remoteVideoElement: HTMLVideoElement | null = $state(null);

	const socket = io();

	interface Props {
		room: string | undefined;
		username: string;
		localMicStream: MediaStream | null;
		localVideoStream: MediaStream | null;
	}

	const { username, room, localMicStream, localVideoStream }: Props = $props();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	onMount(async () => {
		try {
			socket.emit('join-room', room, username);

			const iceServers = await getIceServers();
			pc = new RTCPeerConnection(iceServers);

			if (localMicStream !== null) {
				localMicStream.getTracks().forEach((track: MediaStreamTrack) => {
					if (pc === null) throw new Error('Peer connection is null');

					pc.addTrack(track, localMicStream);
				});
			}

			if (localVideoStream !== null) {
				localVideoStream.getTracks().forEach((track: MediaStreamTrack) => {
					if (pc === null) throw new Error('Peer connection is null');

					pc.addTrack(track, localVideoStream);
				});
			}

			remoteStream = new MediaStream();
			pc.ontrack = (event) => {
				event.streams[0].getTracks().forEach((track) => {
					if (remoteStream === null) throw new Error('Remote stream is null');

					remoteStream.addTrack(track);
				});
			};

			pc.onicecandidate = (event) => {
				if (event.candidate) {
					socket.emit('ice-candidate', event.candidate, room, socket.id);
				}
			};
		} catch (error) {
			console.error('Error setting ICE candidate:', error);
		}

		// Listen for ICE candidates
		socket.on('ice-candidate', (candidate) => {
			try {
				if (pc === null) throw new Error('Peer connection is null');

				if (pc.currentRemoteDescription) {
					const iceCandidate = new RTCIceCandidate(candidate);
					pc.addIceCandidate(iceCandidate);
				}
			} catch (error) {
				console.error('Error listening for ICE candidates:', error);
			}
		});

		// Listen for answers
		socket.on('answer', async (answer) => {
			console.log('Received answer');
			try {
				if (pc === null) throw new Error('Peer connection is null');

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
				if (pc === null) throw new Error('Peer connection is null');

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
</script>

{#if pc}
	<main>
		<Video videoStream={localVideoStream} videoElement={localVideoElement} />
		<Video videoStream={remoteStream} videoElement={remoteVideoElement} />
		<ButtonJoinRoom {pc} {room} {socket} />
		<Chat {socket} {room} />
	</main>
{/if}

<style>
	main {
		margin: 2rem;
	}
</style>
