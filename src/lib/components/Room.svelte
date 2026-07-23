<script lang="ts">
	import { userState, peerState } from '$lib/state.svelte';
	import { disconnectUser } from '$lib/utils/disconnectUser';

	import Video from '$lib/components/Video.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import EmbeddedApps from '$lib/components/EmbeddedApps.svelte';
	import {
		ButtonDisconnect,
		ButtonMuteMic,
		ButtonDeafen,
		ButtonToggleVideo,
		ButtonRoomCopy,
		ButtonChatToggle
	} from '$lib/components/Buttons';
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
		<RoomTopButtons bind:roomToggle />
		<div id="room__videos-chat">
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
			<Chat />
		</div>
		<div id="room__buttons">
			<div id="room__buttons-left">
				<div class="room__buttons-pill">
					<ButtonRoomCopy />
				</div>
			</div>
			<div class="room__buttons-pill">
				<ButtonMuteMic />
				<ButtonDeafen />
				<ButtonToggleVideo />
				<ButtonDisconnect />
			</div>
			<div id="room__buttons-right">
				<ButtonChatToggle />
			</div>
		</div>
	</section>
	<section id="room__apps" bind:this={roomAppsElement}>
		<RoomTopButtons bind:roomToggle />
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

	#room__videos-chat {
		display: flex;
		flex: 2;
		min-height: 0; /* Add this */
		position: relative;
	}

	#room__videos {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 0.5rem;
		flex: 1;
		min-height: 0;
		min-width: 0;
		margin-right: 0.5rem;
	}

	#room__buttons {
		display: flex;
		margin: 0.5rem 0;
		flex-shrink: 0;
	}

	.room__buttons-pill {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-normal);
	}

	#room__buttons-left {
		display: flex;
		flex: 1;
	}

	#room__buttons-right {
		display: flex;
		justify-content: flex-end;
		flex: 1;
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
	}
</style>
