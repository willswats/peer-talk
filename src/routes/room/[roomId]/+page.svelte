<script lang="ts">
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getIceServers } from '$lib/utils/getIceServers';
	import { validate as uuidvalidate } from 'uuid';
	import { generateRandomUsername } from '$lib/utils/generateRandomUsername';

	import LocalVideo from '$lib/components/LocalVideo.svelte';
	import RemoteStream from '$lib/components/RemoteStream.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import ButtonMicrophone from '$lib/components/ButtonMicrophone.svelte';
	import ButtonJoinRoom from '$lib/components/ButtonJoinRoom.svelte';

	// Global state
	let pc: RTCPeerConnection | null = $state(null);
	let room: string | undefined = $state(undefined);
	let roomValid = $state(false);
	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	onMount(async () => {
		try {
			room = $page.params.roomId;
			roomValid = uuidvalidate(room);

			const username = generateRandomUsername();
			socket.emit('join-room', room, username);

			const iceServers = await getIceServers();
			pc = new RTCPeerConnection(iceServers);

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

{#if pc && roomValid}
	<main>
		<LocalVideo {pc} />
		<RemoteStream {pc} />
		<ButtonMicrophone {pc} />
		<ButtonJoinRoom {pc} {room} {socket} />
		<Chat {socket} {room} />
	</main>
{:else if !roomValid}
	<main>
		<p>Invalid room</p>
	</main>
{/if}

<style>
	main {
		margin: 2rem;
	}
</style>
