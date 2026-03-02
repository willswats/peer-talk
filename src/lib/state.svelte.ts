import { io, Socket } from 'socket.io-client';

interface userState {
	joinedRoom: boolean;
	roomId: string | undefined;
	username: string;
	localMicStream: MediaStream | null;
	localVideoStream: MediaStream | null;
	localMicEnabled: boolean;
	localVideoEnabled: boolean;
}

interface peers {
	[key: string]: RTCPeerConnection;
}

interface peerTracks {
	[key: string]: string;
}

interface peerState {
	socket: Socket;
	peers: peers;
	peerTracks: peerTracks;
	remoteStreams: MediaStream[];
}

export const userState: userState = $state({
	joinedRoom: false,
	roomId: undefined,
	username: '',
	localMicEnabled: true,
	localVideoEnabled: true,
	localMicStream: null,
	localVideoStream: null
});

export const peerState: peerState = $state({
	socket: io(),
	peers: {},
	peerTracks: {}, // used to identify which tracks belong to which peer (for deletion)
	remoteStreams: []
});

export function resetUserState() {
	userState.joinedRoom = false;
	userState.roomId = undefined;
	userState.username = '';
	userState.localMicEnabled = true;
	userState.localVideoEnabled = true;

	userState.localMicStream?.getTracks().forEach((track) => track.stop());
	userState.localVideoStream?.getTracks().forEach((track) => track.stop());

	userState.localMicStream = null;
	userState.localVideoStream = null;
}

export function resetPeerState() {
	peerState.socket = io();
	peerState.peers = {};
	peerState.peerTracks = {};
	peerState.remoteStreams = [];
}
