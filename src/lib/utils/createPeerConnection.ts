import { userState, peerState } from '$lib/state.svelte';
import { Socket } from 'socket.io-client';

export function createPeerConnection(socket: Socket, socketId: string) {
	const pc = new RTCPeerConnection({
		iceServers: [
			{
				urls: 'stun:stun.relay.metered.ca:80'
			}
		]
	});

	if (userState.localStream !== null) {
		userState.localStream.getTracks().forEach((track: MediaStreamTrack) => {
			if (userState.localStream === null) return;
			pc.addTrack(track, userState.localStream);
		});
	}

	// This allows users without video to receive video from users with video (camera)
	pc.addTransceiver('video', { direction: 'recvonly' });

	// Create a MediaStream for each peer for all of the tracks
	const remoteStream = new MediaStream();

	pc.ontrack = (event) => {
		event.streams[0].getTracks().forEach((track) => {
			remoteStream.addTrack(track);
		});

		// Only add to peerState after we have at least one track.
		// This ensures svelte has the correct reference when adding the remoteStreams.
		if (!peerState.remoteStreams.includes(remoteStream)) {
			peerState.remoteStreams.push(remoteStream);
			peerState.remoteStreamIdentifier[socketId] = remoteStream.id;
		}
	};

	pc.onicecandidate = (event) => {
		if (event.candidate) {
			console.log('Sending ICE candidate to user:', socketId);
			socket.emit('signal', { target: socketId, signal: event.candidate });
		}
	};

	peerState.peers[socketId] = pc;

	return pc;
}
