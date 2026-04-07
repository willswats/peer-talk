import { Socket } from 'socket.io-client';
import { createSocketWithListeners } from '$lib/utils/createSocketWithListeners';
import { apps } from '@/apps.json';

interface userState {
	joinedRoom: boolean;
	roomId: string | undefined;
	username: string;
	localMicEnabled: boolean;
	localVideoEnabled: boolean;
	deafened: boolean;
	chatToggled: boolean;
	localStream: MediaStream | null;
}

interface peers {
	[key: string]: RTCPeerConnection;
}

interface remoteStreamIdentifier {
	[key: string]: string; // socketId - stream.id
}

interface peerUsernames {
	[key: string]: string; // socketId - username
}

interface peerState {
	socket: Socket;
	peers: peers;
	remoteStreams: MediaStream[];
	remoteStreamIdentifier: remoteStreamIdentifier;
	usernames: peerUsernames;
	messages: string[];
}

export const userState: userState = $state({
	joinedRoom: false,
	roomId: undefined,
	username: '',
	localMicEnabled: false,
	localVideoEnabled: false,
	deafened: false,
	chatToggled: false,
	localStream: null
});

export const peerState: peerState = $state({
	socket: createSocketWithListeners(),
	peers: {},
	remoteStreams: [],
	remoteStreamIdentifier: {}, // used to identify which tracks belong to which peer (for deletion)
	usernames: {},
	messages: []
});

export interface embeddedApp {
	id: string;
	title: string;
	description: string;
	url: string;
	git: string;
	render: boolean;
}

export const embeddedApps: embeddedApp[] = $state([]);

// Init the embededApps state with the data from apps.json
for (const app of apps) {
	embeddedApps.push({ ...app, render: false });
}

export function resetUserState() {
	userState.joinedRoom = false;
	userState.roomId = undefined;
	userState.username = '';
	userState.localMicEnabled = false;
	userState.localVideoEnabled = false;
	userState.deafened = false;
	userState.chatToggled = false;

	userState.localStream?.getTracks().forEach((track) => track.stop());

	userState.localStream = null;
}

export function resetPeerState() {
	peerState.socket = createSocketWithListeners();

	Object.values(peerState.peers).forEach((pc) => pc.close());

	peerState.peers = {};
	peerState.remoteStreams = [];
	peerState.remoteStreamIdentifier = {};
	peerState.usernames = {};
	peerState.messages = [];
}
