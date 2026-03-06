import { createPeerConnection } from '$lib/utils/createPeerConnection';
import { io } from 'socket.io-client';
import { peerState } from '$lib/state.svelte';

export function createSocketWithListeners() {
	const socket = io();

	socket.on('user-connected', async (socketId) => {
		try {
			console.log('User connected:', socketId);

			const pc = createPeerConnection(socket, socketId);

			const offerDescription = await pc.createOffer();
			await pc.setLocalDescription(offerDescription);

			socket.emit('signal', { target: socketId, signal: pc.localDescription });
		} catch (error) {
			console.log('Error creating offer:', error);
		}
	});

	socket.on('signal', async (data) => {
		const { signal, from } = data;

		if (!peerState.peers[from]) {
			console.log('Creating peer connection for user:', from);
			createPeerConnection(socket, from);
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

				socket.emit('signal', {
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

	socket.on('chat-message', (data) => {
		peerState.messages.unshift(`${data.name} (${data.time}): ${data.message}`);
	});

	socket.on('user-disconnected', (socketId) => {
		console.log('User disconnected:', socketId);
		if (peerState.peers[socketId]) {
			peerState.peers[socketId].close();
			delete peerState.peers[socketId];
		}

		// Remove the track from remoteStreams, then cleanup remoteStreamIdentifier (svelte then removes the element)
		const trackId = peerState.remoteStreamIdentifier[socketId];
		peerState.remoteStreams = peerState.remoteStreams.filter(function (remoteStream) {
			return remoteStream.id !== trackId;
		});
		delete peerState.remoteStreamIdentifier[socketId];
	});

	return socket;
}
