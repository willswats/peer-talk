<script lang="ts">
	import Video from './Video.svelte';

	interface Props {
		localVideoStream: MediaStream | null;
		localMicStream: MediaStream | null;
		joinRoomButtonPressed: boolean;
		username: string;
	}

	let {
		joinRoomButtonPressed = $bindable(),
		localVideoStream = $bindable(),
		localMicStream = $bindable(),
		username = $bindable()
	}: Props = $props();

	async function handleOnClickVideo() {
		try {
			const videoConstraints = { video: true, audio: false };
			localVideoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
		} catch (error) {
			console.log('Error getting permissions', error);
		}
	}

	async function handleOnClickMic() {
		try {
			const micConstraints = { video: false, audio: true };
			localMicStream = await navigator.mediaDevices.getUserMedia(micConstraints);
		} catch (error) {
			console.log('Error getting permissions', error);
		}
	}

	function handleOnClickJoinRoom() {
		// TODO: add error message
		if (localVideoStream !== null || localMicStream !== null) {
			joinRoomButtonPressed = true;
		}
	}
</script>

<Video videoStream={localVideoStream} />
<button onclick={handleOnClickVideo}>Video</button>
<button onclick={handleOnClickMic}>Microphone</button>
<input type="text" bind:value={username} />
<button onclick={handleOnClickJoinRoom}>Join Room</button>
