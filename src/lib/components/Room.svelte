<script lang="ts">
	import { userState, peerState } from '$lib/state.svelte';
	import { disconnectUser } from '$lib/utils/disconnectUser';

	import Video from '$lib/components/Video.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import EmbeddedApps from '$lib/components/EmbeddedApps.svelte';
	import ButtonDisconnect from '$lib/components/ButtonDisconnect.svelte';
	import ButtonMuteMic from '$lib/components/ButtonMuteMic.svelte';
	import ButtonDeafen from '$lib/components/ButtonDeafen.svelte';
	import ButtonToggleVideo from '$lib/components/ButtonToggleVideo.svelte';
	import RoomTopButtons from '$lib/components/RoomTopButtons.svelte';

	import { beforeNavigate } from '$app/navigation';

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

	beforeNavigate(({ type, cancel }) => {
		// Allow user to refresh or leave page without default browser prompt
		if (type === 'leave') {
			return;
		}

		if (!confirm('Are you sure you want to disconnect from this room?')) {
			cancel();
		} else {
			disconnectUser();
		}
	});

	function getUsernameFromStream(streamId: string): string {
		const socketId = Object.keys(peerState.remoteStreamIdentifier).find(
			(key) => peerState.remoteStreamIdentifier[key] === streamId
		);

		return socketId ? peerState.usernames[socketId] || 'Unknown User' : 'Unknown User';
	}
</script>

<main id="room">
	<section id="room__talk" bind:this={roomTalkElement}>
		<RoomTopButtons roomId={userState.roomId} bind:roomToggle />
		<div id="room__videos">
			<Video username={userState.username} videoStream={userState.localStream} muted={true} />
			{#each peerState.remoteStreams as remoteStream (remoteStream.id)}
				<Video
					username={getUsernameFromStream(remoteStream.id)}
					videoStream={remoteStream}
					muted={false}
				/>
			{/each}
		</div>
		<div id="room__buttons">
			<ButtonMuteMic />
			<ButtonDeafen />
			<ButtonToggleVideo />
			<ButtonDisconnect />
		</div>
		<Chat />
	</section>
	<section id="room__apps" bind:this={roomAppsElement}>
		<RoomTopButtons roomId={userState.roomId} bind:roomToggle />
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

	@media screen and (max-width: 768px) {
		#room__videos {
			display: grid;
			grid-template-columns: 1fr;
		}

		#room__talk {
			/* TODO: fix min-height and min-width not working on IOS
		- currently causes elements to be hidden, rather than shrinking the video elements
		 */
			height: 100%;
		}
	}
</style>
