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
		<h1>Settings</h1>
		<div id="video-container">
			{#if userState.localStream}
				<Video videoStream={userState.localStream} muted={true} --background-color="var(--crust)" />
			{:else}
				No camera currently available (grant permissions)
			{/if}
		</div>
		<label for="input-username">Username:</label>
		<input id="input-username" type="text" bind:value={userState.username} />
		<div>
			<button onclick={handleOnClickPerms}>Grant Permissions</button>
		</div>
		<div>
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

	#video-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 30rem;
		height: 20rem;
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
	}

	section {
		display: flex;
		flex-direction: column;
		background-color: var(--mantle);
		border-radius: var(--border-radius-normal);
		padding: 2rem;
	}

	label {
		margin-top: 0.5rem;
	}

	input {
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
	}

	div {
		display: flex;
	}

	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
		margin-top: 0.5rem;
	}

	@media screen and (max-width: 768px) {
		#video-container {
			width: 20rem;
			height: 10rem;
		}
	}
</style>
