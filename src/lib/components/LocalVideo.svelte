<script lang="ts">
	interface Props {
		pc: RTCPeerConnection | null;
	}

	let { pc }: Props = $props();

	let localVideoStream: MediaStream | null = $state(null);
	let localVideoElement: HTMLVideoElement | null = $state(null);

	async function handleWebCamButtonClick() {
		try {
			if (pc === null) throw new Error('Peer connection is null');

			const constraints = { video: true, audio: false };
			localVideoStream = await navigator.mediaDevices.getUserMedia(constraints);

			localVideoStream.getTracks().forEach((track) => {
				if (localVideoStream === null) throw new Error('Remote stream is null');

				pc.addTrack(track, localVideoStream);
			});
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	}

	$effect(() => {
		if (localVideoElement !== null) {
			localVideoElement.srcObject = localVideoStream;
		}
	});
</script>

<video bind:this={localVideoElement} id="local-video" autoplay playsinline controls={false}>
	<track kind="captions" />
</video>
<button onclick={handleWebCamButtonClick} id="webcam-button">Webcam</button>
