export function toggleLocalAudio(localStream: MediaStream | null, localMicEnabled: boolean) {
	if (localStream !== null) {
		localMicEnabled = !localMicEnabled;
		localStream.getAudioTracks()[0].enabled = localMicEnabled;
	}
	return localMicEnabled;
}

export function toggleDeafen(deafened: boolean, remoteStreams: MediaStream[]) {
	if (remoteStreams.length >= 1) {
		deafened = !deafened;
		if (deafened) {
			// Disable remote audio streams
			for (const remoteStream of remoteStreams) {
				remoteStream.getAudioTracks()[0].enabled = false;
			}
		} else {
			// Enable remote audio streams
			for (const remoteStream of remoteStreams) {
				remoteStream.getAudioTracks()[0].enabled = true;
			}
		}
	}
	return deafened;
}

export function handleButtonRoomCopy(
	buttonEl: HTMLButtonElement,
	copy: string,
	textAfter: string,
	textBefore: string
) {
	navigator.clipboard.writeText(copy);
	buttonEl.innerText = textAfter;
	setTimeout(() => {
		buttonEl.innerText = textBefore;
	}, 5000);
}
