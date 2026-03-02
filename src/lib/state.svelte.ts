interface userState {
	joinedRoom: boolean;
	roomId: string | undefined;
}

export const userState: userState = $state({
	joinedRoom: false,
	roomId: undefined
});
