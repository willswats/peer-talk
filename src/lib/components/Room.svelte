<script lang="ts">
	import { userState, peerState } from '$lib/state.svelte';

	import Video from '$lib/components/Video.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import EmbeddedApps from '$lib/components/EmbeddedApps.svelte';
	import ButtonDisconnect from '$lib/components/ButtonDisconnect.svelte';
	import ButtonMuteMic from '$lib/components/ButtonMuteMic.svelte';
	import ButtonToggleVideo from '$lib/components/ButtonToggleVideo.svelte';

	let roomToggle: boolean = $state(false);
	let roomTalkElement: HTMLElement;
	let roomAppsElement: HTMLElement;

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
	<section id="room__talk" bind:this={roomTalkElement}>
		<div id="room__toggle-buttons">
			<button class="btn-blue" onclick={() => (roomToggle = false)}>Talk</button>
			<button class="btn-mauve" onclick={() => (roomToggle = true)}>Apps</button>
		</div>
		<div id="room__videos">
			<Video videoStream={userState.localStream} muted={true} />
			{#each peerState.remoteStreams as remoteStream (remoteStream.id)}
				<Video videoStream={remoteStream} muted={false} />
			{/each}
		</div>
		<div id="room__buttons">
			<ButtonMuteMic />
			<ButtonToggleVideo />
			<ButtonDisconnect />
		</div>
		<Chat />
	</section>
	<section id="room__apps" bind:this={roomAppsElement}>
		<div id="room__toggle-buttons">
			<button class="btn-blue" onclick={() => (roomToggle = false)}>Talk</button>
			<button class="btn-mauve" onclick={() => (roomToggle = true)}>Apps</button>
		</div>
		<EmbeddedApps />
	</section>
</main>

<style>
	#room {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	#room__talk {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 5rem); /* Account for nav and margin */
		flex-grow: 1;
		min-height: 0;
		margin: 1rem;
	}

	#room__toggle-buttons {
		margin-bottom: 0.5rem;
	}

	#room__videos {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		flex: 1;
		min-height: 0;
		min-width: 0;
	}

	#room__buttons {
		margin: 0.5rem 0;
		flex-shrink: 0;
	}

	#room__apps {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		margin: 1rem;
	}

	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}

	@media screen and (max-width: 768px) {
		#room__videos {
			display: grid;
			grid-template-columns: 1fr;
		}
	}
</style>
