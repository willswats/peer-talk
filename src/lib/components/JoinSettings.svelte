<script lang="ts">
	import Video from '$lib/components/Video.svelte';
	import { peerState, resetUserState, userState } from '$lib/state.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { toggleLocalAudio } from '$lib/utils/toggleLocalAudio';
	import { toggleLocalVideo } from '$lib/utils/toggleLocalVideo';

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

	function handleOnClickLeaveRoom() {
		resetUserState();
		goto(resolve('/'));
	}
</script>

<main>
	<section>
		<h1>Settings</h1>
		<p>To join the room, you must grant permission for the app to use your camera/microphone.</p>
		<div>
			<button onclick={handleOnClickPerms}>Grant Permissions</button>
		</div>
		<div id="video-container">
			{#if userState.localStream}
				<Video videoStream={userState.localStream} muted={true} --background-color="var(--crust)" />
			{:else}
				No camera currently available
			{/if}
		</div>
		<label for="input-username">Username:</label>
		<input id="input-username" type="text" bind:value={userState.username} />
		<div>
			<button onclick={toggleLocalAudio}>Mute Mic</button>
			<button onclick={toggleLocalVideo}>Toggle Video</button>
		</div>
		<div>
			<button onclick={handleOnClickJoinRoom}>Join Room</button>
			<button onclick={handleOnClickLeaveRoom}>Leave Room</button>
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

	h1 {
		color: var(--mauve);
	}

	#video-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 20rem;
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		margin-top: 0.5rem;
	}

	section {
		display: flex;
		flex-direction: column;
		background-color: var(--mantle);
		border-radius: var(--border-radius-normal);
		padding: 2rem;
		width: 30rem;
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

	div button {
		margin-right: 0.5rem;
	}

	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
		margin-top: 0.5rem;
	}

	@media screen and (max-width: 768px) {
		section {
			width: 20rem;
		}

		#video-container {
			height: 15rem;
		}
	}
</style>
