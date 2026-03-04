<script lang="ts">
	import { goto } from '$app/navigation';
	import { userState, peerState, resetPeerState, resetUserState } from '$lib/state.svelte';
	import { resolve } from '$app/paths';

	import Video from './Video.svelte';
	import Chat from './Chat.svelte';
	import EmbeddedApps from './EmbeddedApps.svelte';

	let roomToggle: boolean = $state(false);
	let roomTalkElement: HTMLElement;
	let roomAppsElement: HTMLElement;

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

	$effect(() => {
		if (!roomToggle) {
			roomAppsElement.classList.add('hidden');
			roomTalkElement.classList.remove('hidden');
		} else {
			roomAppsElement.classList.remove('hidden');
			roomTalkElement.classList.add('hidden');
		}
	});
</script>

<main id="room">
	<div id="room__toggle-buttons">
		<button onclick={() => (roomToggle = false)}>Talk</button>
		<button onclick={() => (roomToggle = true)}>Apps</button>
	</div>
	<section id="room__talk" bind:this={roomTalkElement}>
		<div id="room__videos">
			<Video videoStream={userState.localStream} muted={true} />
			{#each peerState.remoteStreams as remoteStream (remoteStream.id)}
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
	<section id="room__apps" bind:this={roomAppsElement}>
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
