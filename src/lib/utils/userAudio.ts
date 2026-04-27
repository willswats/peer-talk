export function toggleLocalAudio(localStream: MediaStream | null, localMicEnabled: boolean) {
	if (localStream !== null) {
		localMicEnabled = !localMicEnabled;
		localStream.getAudioTracks()[0].enabled = localMicEnabled;
	}
	return localMicEnabled;
}
