<script lang="ts">
	import Video from './Video.svelte';
	import { userState } from '$lib/state.svelte';

	interface Props {
		joinRoomButtonPressed: boolean;
	}

	let { joinRoomButtonPressed = $bindable() }: Props = $props();

	async function handleOnClickVideo() {
		try {
			const videoConstraints = { video: true, audio: false };
			userState.localVideoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
		} catch (error) {
			console.log('Error getting permissions', error);
		}
	}

	async function handleOnClickMic() {
		try {
			const micConstraints = { video: false, audio: true };
			userState.localMicStream = await navigator.mediaDevices.getUserMedia(micConstraints);
		} catch (error) {
			console.log('Error getting permissions', error);
		}
	}

	function handleOnClickJoinRoom() {
		// TODO: add error message
		if (userState.localVideoStream !== null || userState.localMicStream !== null) {
			joinRoomButtonPressed = true;
		}
	}
</script>

<main>
	<section>
		<Video videoStream={userState.localVideoStream} />
		<input type="text" bind:value={userState.username} />
		<div>
			<button onclick={handleOnClickVideo}>Video</button>
			<button onclick={handleOnClickMic}>Microphone</button>
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
		background-color: #2a2a2a;
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
		background-color: #3a3a3a;
		border-radius: 25px;
		padding: 0.5rem 1rem;
	}
</style>
