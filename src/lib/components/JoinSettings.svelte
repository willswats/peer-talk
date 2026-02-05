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

	let localVideoElement: HTMLVideoElement | null = $state(null);

	async function handleVideoButtonPressed() {
		try {
			const videoConstraints = { video: true, audio: false };
			localVideoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
		} catch (error) {
			console.log('Error getting permissions', error);
		}
	}

	async function handleMicButtonPressed() {
		try {
			const micConstraints = { video: false, audio: true };
			localMicStream = await navigator.mediaDevices.getUserMedia(micConstraints);
		} catch (error) {
			console.log('Error getting permissions', error);
		}
	}
</script>

<Video videoStream={localVideoStream} videoElement={localVideoElement} />
<button onclick={handleVideoButtonPressed}>Video</button>
<button onclick={handleMicButtonPressed}>Microphone</button>
<input type="text" bind:value={username} />
<button onclick={() => (joinRoomButtonPressed = true)}>Join Room</button>
