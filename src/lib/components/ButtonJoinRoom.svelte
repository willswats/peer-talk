<script lang="ts">
	import type { Socket } from 'socket.io-client';

	interface Props {
		pc: RTCPeerConnection | null;
		room: string | undefined;
		socket: Socket;
	}

	let { pc, room, socket }: Props = $props();

	async function handleJoinRoomButtonClick() {
		// Create and send offer
		if (pc === null) throw new Error('Error: peer connection is null');

		const offerDescription = await pc.createOffer();
		await pc.setLocalDescription(offerDescription);
		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type
		};

		socket.emit('offer', offer, room);
	}
</script>

<button onclick={handleJoinRoomButtonClick} id="join-button">Join Room</button>
