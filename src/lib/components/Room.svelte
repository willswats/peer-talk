<script lang="ts">
	import { io } from 'socket.io-client';
	import { goto } from '$app/navigation';

	import Video from './Video.svelte';
	import Chat from './Chat.svelte';
	import EmbeddedApps from './EmbeddedApps.svelte';
	import { userState } from '$lib/state.svelte';
	import { resolve } from '$app/paths';

	// Global state
	interface peers {
		[key: string]: RTCPeerConnection;
	}

	interface peerTracks {
		[key: string]: string;
	}

	let peers: peers = {};
	let peerTracks: peerTracks = {}; // used to identify which tracks belong to which peer (for deletion)
	let remoteStreams: MediaStream[] = $state([]);

	let localVideoEnabled = $state(true);
	let localMicEnabled = $state(true);

	const socket = io();

	interface Props {
		username: string;
		localMicStream: MediaStream | null;
		localVideoStream: MediaStream | null;
	}

	const { username, localMicStream, localVideoStream }: Props = $props();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	socket.emit('join-room', userState.roomId, username);

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

		// Remove the track from remoteStreams, then cleanup peerTracks (svelte then removes the element)
		const trackId = peerTracks[socketId];
		remoteStreams = remoteStreams.filter(function (remoteStream) {
			return remoteStream.id !== trackId;
		});
		delete peerTracks[socketId];
	});

	function createPeerConnection(socketId: string) {
		const pc = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.relay.metered.ca:80'
				}
			]
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

		pc.ontrack = (event) => {
			const stream = event.streams[0];
			remoteStreams.push(stream);
			peerTracks[socketId] = stream.id;
		};

		pc.onicecandidate = (event) => {
			if (event.candidate) {
				console.log('Sending ICE candidate to user:', socketId);
				socket.emit('signal', { target: socketId, signal: event.candidate });
			}
		};

		peers[socketId] = pc;
		return pc;
	}

	function handleOnClickMuteMic() {
		if (localMicStream !== null) {
			localMicEnabled = !localMicEnabled;
			localMicStream.getAudioTracks()[0].enabled = localMicEnabled;
		}
	}

	function handleOnClickToggleVideo() {
		if (localVideoStream !== null) {
			localVideoEnabled = !localVideoEnabled;
			localVideoStream.getVideoTracks()[0].enabled = localVideoEnabled;
		}
	}

	function handleOnClickDisconnect() {
		socket.disconnect();
		goto(resolve('/'));
	}
</script>

<main id="room">
	<section id="room__container">
		<div id="room__videos">
			<Video videoStream={localVideoStream} />
			{#each remoteStreams as remoteStream (remoteStream.id)}
				<Video videoStream={remoteStream} />
			{/each}
		</div>
		<div id="room__buttons">
			<button onclick={handleOnClickMuteMic}>Mute</button>
			<button onclick={handleOnClickToggleVideo}>Toggle video</button>
			<button onclick={handleOnClickDisconnect}>Disconnect</button>
		</div>
		<Chat {socket} />
		<EmbeddedApps />
	</section>
</main>

<style>
	#room {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		margin: 2rem;
	}

	#room__container {
		display: flex;
		flex-direction: column;
		background-color: #2a2a2a;
		border-radius: 25px;
		padding: 2rem;
	}

	#room__videos {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr;
	}

	#room__buttons {
		margin: 0.5rem 0;
	}

	button {
		background-color: #3a3a3a;
		border-radius: 25px;
		padding: 0.5rem 1rem;
	}

	button:hover {
		background-color: #4a4a4a;
	}

	@media screen and (min-width: 768px) {
		#room__videos {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
