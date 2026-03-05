<script lang="ts">
	import Video from '$lib/components/Video.svelte';
	import { peerState, userState } from '$lib/state.svelte';

	async function getMediaWithFallback() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			});
			return stream;
		} catch (error: any) {
			if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
				try {
					const audioStream = await navigator.mediaDevices.getUserMedia({
						audio: true
					});
					return audioStream;
				} catch (audioError) {
					throw new Error('Could not access any media devices');
				}
			} else {
				throw error;
			}
		}
	}

	async function handleOnClickPerms() {
		try {
			userState.localStream = await getMediaWithFallback();
		} catch (error) {
			// TODO: add error message to UI
			console.log('Error getting permissions', error);
		}
	}

	function handleOnClickJoinRoom() {
		// TODO: add error message to UI
		if (userState.localStream !== null || userState.localStream !== null) {
			peerState.socket.emit('join-room', userState.roomId, userState.username);
			userState.joinedRoom = true;
		}
	}
</script>

<main>
	<section>
		<Video videoStream={userState.localStream} muted={true} />
		<input type="text" bind:value={userState.username} />
		<div>
			<button onclick={handleOnClickPerms}>Grant Permissions</button>
			<button onclick={handleOnClickJoinRoom}>Join Room</button>
		</div>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		margin: 2rem;
	}

	section {
		display: flex;
		flex-direction: column;
		background-color: var(--mantle);
		border-radius: 25px;
		padding: 2rem;
	}

	input {
		border-radius: 25px;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}

	div {
		display: flex;
	}

	button {
		background-color: var(--crust);
		border-radius: 25px;
		padding: 0.5rem;
	}
</style>
