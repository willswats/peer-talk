import { toggleDeafen } from '$lib/utils/userActions';
import { test, expect } from 'vitest';

// Helper to create a mock MediaStream with audio tracks
function createMockStream(audioEnabled: boolean) {
	const mockTrack = { enabled: audioEnabled } as MediaStreamTrack;
	const mockStream = {
		getAudioTracks: () => [mockTrack]
	} as MediaStream;
	return mockStream;
}

// Helper to create multiple mock streams
function createMockStreams(count: number, audioEnabled: boolean): MediaStream[] {
	return Array.from({ length: count }, () => createMockStream(audioEnabled));
}

test('Deafen - disable all remote audio streams', () => {
	const remoteStreams = createMockStreams(3, true);
	const deafened = false;

	const result = toggleDeafen(deafened, remoteStreams);

	expect(result).toBe(true);
	// Check all remote streams are disabled
	for (const stream of remoteStreams) {
		expect(stream.getAudioTracks()[0].enabled).toBe(false);
	}
});

test('Undeafen - enable all remote audio streams', () => {
	const remoteStreams = createMockStreams(3, false);
	const deafened = true;

	const result = toggleDeafen(deafened, remoteStreams);

	expect(result).toBe(false);
	// Check all remote streams are enabled
	for (const stream of remoteStreams) {
		expect(stream.getAudioTracks()[0].enabled).toBe(true);
	}
});

test('Handle single remote stream', () => {
	const remoteStreams = createMockStreams(1, true);
	const deafened = false;

	const result = toggleDeafen(deafened, remoteStreams);

	expect(result).toBe(true);
	expect(remoteStreams[0].getAudioTracks()[0].enabled).toBe(false);
});

test('Toggle deafen twice returns to original state', () => {
	const remoteStreams = createMockStreams(2, true);

	// First toggle - deafen
	let deafened = false;
	deafened = toggleDeafen(deafened, remoteStreams);
	expect(deafened).toBe(true);

	// All streams should be disabled
	for (const stream of remoteStreams) {
		expect(stream.getAudioTracks()[0].enabled).toBe(false);
	}

	// Second toggle - undeafen
	deafened = toggleDeafen(deafened, remoteStreams);
	expect(deafened).toBe(false);

	// All streams should be re-enabled
	for (const stream of remoteStreams) {
		expect(stream.getAudioTracks()[0].enabled).toBe(true);
	}
});

test('Should handle stream with audio track disabled initially', () => {
	const remoteStreams = createMockStreams(1, false);
	const deafened = false;

	const result = toggleDeafen(deafened, remoteStreams);

	// Should toggle deafened to true
	expect(result).toBe(true);
	// Should set track to disabled (false)
	expect(remoteStreams[0].getAudioTracks()[0].enabled).toBe(false);
});
