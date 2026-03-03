import { Socket } from 'socket.io-client';
import { createSocketWithListeners } from '$lib/utils/createSocketWithListeners';
import { apps } from '@/apps.json';

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
	socket: createSocketWithListeners(),
	peers: {},
	peerTracks: {}, // used to identify which tracks belong to which peer (for deletion)
	remoteStreams: []
});

interface embeddedApp {
	id: string;
	title: string;
	url: string;
	userConsent: boolean;
}

export const embeddedApps: embeddedApp[] = $state([]);

// Init the embededApps state with the data from apps.json
for (const app of apps) {
	embeddedApps.push({ ...app, userConsent: false });
}

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
	peerState.socket = createSocketWithListeners();

	Object.values(peerState.peers).forEach((pc) => pc.close());

	peerState.peers = {};
	peerState.peerTracks = {};
	peerState.remoteStreams = [];
}
