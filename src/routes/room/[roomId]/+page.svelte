<script lang="ts">
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getIceServers } from '$lib/utils/getIceServers';

	import Chat from '$lib/components/Chat.svelte';
	import Video from '$lib/components/Video.svelte';

	// Global state
	let pc: RTCPeerConnection | null = $state(null);
	let room: string | undefined = $state(undefined);
	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	onMount(async () => {
		try {
			room = $page.params.roomId;
			if (room === undefined) throw new Error('Error: room is undefined');

			socket.emit('join-room', room);

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
				if (pc === null) throw new Error('Error: peer connection is null');

				if (pc.currentRemoteDescription) {
					const iceCandidate = new RTCIceCandidate(candidate);
					pc.addIceCandidate(iceCandidate);
				}
			} catch (error) {
				console.error('Error listening for ICE candidates:', error);
			}
		});
	});
</script>

<main>
	<Video {pc} {room} {socket} />
	<Chat {socket} />
</main>

<style>
	main {
		margin: 2rem;
	}
</style>
