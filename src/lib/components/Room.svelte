<script lang="ts">
	import { goto } from '$app/navigation';
	import { userState, peerState, resetPeerState, resetUserState } from '$lib/state.svelte';
	import { resolve } from '$app/paths';

	import Video from './Video.svelte';
	import Chat from './Chat.svelte';
	import EmbeddedApps from './EmbeddedApps.svelte';

	let roomToggle: boolean = $state(false);

	function handleOnClickMuteMic() {
		if (userState.localStream !== null) {
			userState.localMicEnabled = !userState.localMicEnabled;
			userState.localStream.getAudioTracks()[0].enabled = userState.localMicEnabled;
		}
	}

	function handleOnClickToggleVideo() {
		if (userState.localStream !== null) {
			userState.localVideoEnabled = !userState.localVideoEnabled;
			userState.localStream.getVideoTracks()[0].enabled = userState.localVideoEnabled;
		}
	}

	function handleOnClickDisconnect() {
		peerState.socket.disconnect();
		resetUserState();
		resetPeerState();
		goto(resolve('/'));
	}
</script>

<main id="room">
	<section id="room__container">
		<div id="room__toggle-buttons">
			<button onclick={() => (roomToggle = false)}>Talk</button>
			<button onclick={() => (roomToggle = true)}>Apps</button>
		</div>
		{#if !roomToggle}
			<section id="room__talk">
				<div id="room__videos">
					<Video videoStream={userState.localStream} muted={true} />
					{#each peerState.remoteStreams as remoteStream (remoteStream.id)}
						{console.log(remoteStream.getTracks())}
						<Video videoStream={remoteStream} muted={false} />
					{/each}
				</div>
				<div id="room__buttons">
					<button onclick={handleOnClickMuteMic}>Mute</button>
					<button onclick={handleOnClickToggleVideo}>Toggle video</button>
					<button onclick={handleOnClickDisconnect}>Disconnect</button>
				</div>
				<Chat />
			</section>
		{:else}
			<section id="room__apps">
				<EmbeddedApps />
			</section>
		{/if}
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
