import { userState } from '$lib/state.svelte';
import { generateRandomUsername } from './generateRandomUsername';
import { validate as uuidvalidate } from 'uuid';

export function setUserRoomIdAndUserName(roomId: string) {
	const roomValid = uuidvalidate(roomId);

	if (roomValid) {
		userState.username = generateRandomUsername();
		userState.roomId = roomId;
	}

	return roomValid;
}
