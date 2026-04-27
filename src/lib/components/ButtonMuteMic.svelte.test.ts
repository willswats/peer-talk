import { toggleLocalAudio } from '$lib/utils/userAudio';
import { test, expect } from 'vitest';

// Helper to create a mock MediaStream with audio tracks
function createMockStream(audioEnabled: boolean) {
	const mockTrack = { enabled: audioEnabled } as MediaStreamTrack;
	const mockStream = {
		getAudioTracks: () => [mockTrack]
	} as MediaStream;
	return mockStream;
}

test('Unmute mic', () => {
	const localStream = createMockStream(false);
	const localMicEnabled = false;

	const result = toggleLocalAudio(localStream, localMicEnabled);

	expect(result).toBe(true);
	expect(localStream.getAudioTracks()[0].enabled).toBe(true);
});

test('Mute mic', () => {
	const localStream = createMockStream(true);
	const localMicEnabled = true;

	const result = toggleLocalAudio(localStream, localMicEnabled);

	expect(result).toBe(false);
	expect(localStream.getAudioTracks()[0].enabled).toBe(false);
});

test('Handle null stream', () => {
	const result = toggleLocalAudio(null, true);
	expect(result).toBe(true);
});
