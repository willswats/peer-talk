<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { createPeerConnection } from '$lib/utils/createPeerConnection';
	import { peerState } from '@/lib/state.svelte';

	let { children } = $props();

	peerState.socket.on('user-connected', async (socketId) => {
		try {
			console.log('User connected:', socketId);

			const pc = createPeerConnection(peerState.socket, socketId);

			const offerDescription = await pc.createOffer();
			await pc.setLocalDescription(offerDescription);

			peerState.socket.emit('signal', { target: socketId, signal: pc.localDescription });
		} catch (error) {
			console.log('Error creating offer:', error);
		}
	});

	peerState.socket.on('signal', async (data) => {
		const { signal, from } = data;

		if (!peerState.peers[from]) {
			console.log('Creating peer connection for user:', from);
			createPeerConnection(peerState.socket, from);
		}

		if (signal.candidate) {
			console.log('Received ICE candidate from user:', from);
			try {
				const iceCandidate = new RTCIceCandidate(signal);
				peerState.peers[from].addIceCandidate(iceCandidate);
			} catch (error) {
				console.error('Error listening for ICE candidates:', error);
			}
		}

		if (signal.type === 'offer') {
			console.log('Received offer from user:', from);
			try {
				await peerState.peers[from].setRemoteDescription(new RTCSessionDescription(signal));
				console.log('Remote description set from offer');

				const answer = await peerState.peers[from].createAnswer();
				await peerState.peers[from].setLocalDescription(answer);
				console.log('Answer created and set as local description');

				peerState.socket.emit('signal', {
					target: from,
					signal: peerState.peers[from].localDescription
				});
				console.log('Answer sent to:', peerState.peers[from]);
			} catch (error) {
				console.error('Error handling offer:', error);
			}
		}

		if (signal.type === 'answer') {
			try {
				const answerDescription = new RTCSessionDescription(signal);
				await peerState.peers[from].setRemoteDescription(answerDescription);
			} catch (error) {
				console.error('Error handling answer:', error);
			}
		}
	});

	peerState.socket.on('user-disconnected', (socketId) => {
		console.log('User disconnected:', socketId);
		if (peerState.peers[socketId]) {
			peerState.peers[socketId].close();
			delete peerState.peers[socketId];
		}

		// Remove the track from remoteStreams, then cleanup peerTracks (svelte then removes the element)
		const trackId = peerState.peerTracks[socketId];
		peerState.remoteStreams = peerState.remoteStreams.filter(function (remoteStream) {
			return remoteStream.id !== trackId;
		});
		delete peerState.peerTracks[socketId];
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />
{@render children()}

<style>
	:global {
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			font-family: sans-serif;
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		body {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
			color: #fff;
			background-color: #1a1a1a;
		}

		button {
			color: #fff;
			border: none;
			background-color: transparent;
			cursor: pointer;
		}

		input {
			color: #000;
			border: none;
		}

		svg path {
			fill: #fff;
		}

		input[type='number'] {
			appearance: textfield;
			/* Remove Firefox default browser style */
			outline: none;
		}

		/* Remove WebKit default browser style */
		input[type='number']::-webkit-outer-spin-button,
		input[type='number']::-webkit-inner-spin-button {
			appearance: none;
			margin: 0;
		}

		input[type='range'] {
			cursor: pointer;
			appearance: none;
			/* Remove WebKit default browser style */
		}

		input[type='range']::-webkit-slider-thumb {
			cursor: pointer;
			appearance: none;
			/* Remove WebKit default browser style */
			background-color: #fff;
		}

		input[type='range']::-moz-range-thumb {
			cursor: pointer;
			border: none;
			/* Remove Firefox default browser style */
			background-color: #fff;
		}
	}
</style>
