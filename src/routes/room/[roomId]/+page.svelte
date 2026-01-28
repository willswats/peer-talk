<script lang="ts">
	import { io } from 'socket.io-client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getIceServers } from '$lib/utils/getIceServers';

	import Chat from '$lib/components/Chat.svelte';
	import Video from '$lib/components/Video.svelte';

	// Global state
	let pc: RTCPeerConnection | null = $state(null);
	let room = 'room';
	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	console.log(room);
	onMount(async () => {
		if (room === undefined) {
			return;
		}

		socket.emit('join-room', room);

		const iceServers = await getIceServers();
		pc = new RTCPeerConnection(iceServers);

		pc.onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit('ice-candidate', event.candidate, room, socket.id);
			}
		};

		// Listen for ICE candidates
		socket.on('ice-candidate', (candidate) => {
			if (pc === null) {
				return;
			} else if (pc.currentRemoteDescription) {
				const iceCandidate = new RTCIceCandidate(candidate);
				pc.addIceCandidate(iceCandidate);
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
