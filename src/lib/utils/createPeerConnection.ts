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

	if (userState.localMicStream !== null) {
		userState.localMicStream.getTracks().forEach((track: MediaStreamTrack) => {
			if (userState.localMicStream === null) return;
			pc.addTrack(track, userState.localMicStream);
		});
	}

	if (userState.localVideoStream !== null) {
		userState.localVideoStream.getTracks().forEach((track: MediaStreamTrack) => {
			if (userState.localVideoStream === null) return;
			pc.addTrack(track, userState.localVideoStream);
		});
	}

	pc.ontrack = (event) => {
		const stream = event.streams[0];
		peerState.remoteStreams.push(stream);
		peerState.remoteStreamIdentifier[socketId] = stream.id;
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
