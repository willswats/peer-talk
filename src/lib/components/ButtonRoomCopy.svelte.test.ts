import { handleButtonRoomCopy } from '$lib/utils/userActions';
import { test, expect, vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
	vi.useFakeTimers();

	// Mock clipboard
	vi.stubGlobal('navigator', {
		clipboard: { writeText: vi.fn() }
	});
});

afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

test('Should copy room ID to clipboard and change button text temporarily', () => {
	const button = document.createElement('button');
	button.innerText = 'Copy ID';

	handleButtonRoomCopy(button, 'room-123-456', 'Copied ID', 'Copy ID');

	expect(button.innerText).toBe('Copied ID');
	vi.advanceTimersByTime(5000);
	expect(button.innerText).toBe('Copy ID');
});

test('Should copy room link to clipboard and change button text temporarily', () => {
	const button = document.createElement('button');
	button.innerText = 'Copy Link';

	handleButtonRoomCopy(button, 'https://example.com/room/room-123-456', 'Copied Link', 'Copy Link');

	expect(button.innerText).toBe('Copied Link');
	vi.advanceTimersByTime(5000);
	expect(button.innerText).toBe('Copy Link');
});
