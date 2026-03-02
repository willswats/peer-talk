<script lang="ts">
	import { goto } from '$app/navigation';
	import { userState, peerState } from '$lib/state.svelte';
	import { resolve } from '$app/paths';

	import Video from './Video.svelte';
	import Chat from './Chat.svelte';
	import EmbeddedApps from './EmbeddedApps.svelte';

	if (!userState.joinedRoom) {
		peerState.socket.emit('join-room', userState.roomId, userState.username);
		userState.joinedRoom = true;
	}

	function handleOnClickMuteMic() {
		if (userState.localMicStream !== null) {
			userState.localMicEnabled = !userState.localMicEnabled;
			userState.localMicStream.getAudioTracks()[0].enabled = userState.localMicEnabled;
		}
	}

	function handleOnClickToggleVideo() {
		if (userState.localVideoStream !== null) {
			userState.localVideoEnabled = !userState.localVideoEnabled;
			userState.localVideoStream.getVideoTracks()[0].enabled = userState.localVideoEnabled;
		}
	}

	function handleOnClickDisconnect() {
		peerState.socket.disconnect();
		goto(resolve('/'));
		userState.joinedRoom = false;
	}
</script>

<main id="room">
	<section id="room__container">
		<div id="room__videos">
			<Video videoStream={userState.localVideoStream} />
			{#each peerState.remoteStreams as remoteStream (remoteStream.id)}
				<Video videoStream={remoteStream} />
			{/each}
		</div>
		<div id="room__buttons">
			<button onclick={handleOnClickMuteMic}>Mute</button>
			<button onclick={handleOnClickToggleVideo}>Toggle video</button>
			<button onclick={handleOnClickDisconnect}>Disconnect</button>
		</div>
		<Chat />
		<EmbeddedApps />
	</section>
</main>

<style>
	#room {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		margin: 2rem;
	}

	#room__container {
		display: flex;
		flex-direction: column;
		background-color: #2a2a2a;
		border-radius: 25px;
		padding: 2rem;
	}

	#room__videos {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr;
	}

	#room__buttons {
		margin: 0.5rem 0;
	}

	button {
		background-color: #3a3a3a;
		border-radius: 25px;
		padding: 0.5rem 1rem;
	}

	button:hover {
		background-color: #4a4a4a;
	}

	@media screen and (min-width: 768px) {
		#room__videos {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
