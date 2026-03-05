import { userState } from '$lib/state.svelte';
import { setUserRoomIdAndUserName } from '$lib/utils/setUserRoomIdAndUsername';
import { v4 as uuidv4 } from 'uuid';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

export function createRoom() {
	if (!userState.roomId) {
		const uuid = uuidv4();
		setUserRoomIdAndUserName(uuid);
		goto(resolve(`/room/${userState.roomId}`));
	} else {
		goto(resolve(`/room/${userState.roomId}`));
	}
}
