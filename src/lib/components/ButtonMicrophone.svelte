<script lang="ts">
	interface Props {
		pc: RTCPeerConnection | null;
	}

	let { pc }: Props = $props();

	let localAudioStream: MediaStream | null = $state(null);

	async function handleMicButtonClick() {
		try {
			if (pc === null) throw new Error('Error: peer connection is null');

			const constraints = { video: false, audio: true };
			localAudioStream = await navigator.mediaDevices.getUserMedia(constraints);

			localAudioStream.getTracks().forEach((track) => {
				if (localAudioStream === null) throw new Error('Error: remote stream is null');

				pc.addTrack(track, localAudioStream);
			});
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	}
</script>

<button onclick={handleMicButtonClick} id="mic-button">Microphone</button>
