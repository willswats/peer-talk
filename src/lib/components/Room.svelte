<script lang="ts">
	import { userState, peerState, marketplaceApps } from '$lib/state.svelte';
	import { disconnectUser } from '$lib/utils/disconnectUser';

	import Video from '$lib/components/Video.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import AppPicker from '$lib/components/AppPicker.svelte';
	import {
		Button,
		ButtonDisconnect,
		ButtonMuteMic,
		ButtonDeafen,
		ButtonToggleVideo,
		ButtonShare,
		ButtonChatToggle
	} from '$lib/components/Buttons';
	import { SvgApps } from '$lib/components/svg';
	import CustomAlert from '$lib/components/CustomAlert.svelte';

	import { beforeNavigate } from '$app/navigation';

	// CustomAlert variables
	let alertShown = $state(false);

	beforeNavigate(({ type, cancel }) => {
		// Allow user to refresh or leave page without default browser prompt
		if (type === 'leave') {
			return;
		}

		alertShown = true;

		return new Promise((resolve) => {
			if (alertShown === false) {
				resolve(true);
			} else {
				cancel();
				resolve(false);
			}
		});
	});

	function getUsernameFromStream(streamId: string): string {
		const socketId = Object.keys(peerState.remoteStreamIdentifier).find(
			(key) => peerState.remoteStreamIdentifier[key] === streamId
		);

		return socketId ? peerState.usernames[socketId] || 'Unknown User' : 'Unknown User';
	}

	let appsShown: boolean = $state(false);
</script>

<main id="room">
	<CustomAlert confirmFunction={disconnectUser} bind:alertShown
		>Are you sure you want to disconnect from this room?</CustomAlert
	>
	<AppPicker bind:appsShown />
	<section id="room__talk">
		<div id="room__main-content">
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
					<ButtonShare />
				</div>
			</div>
			<div class="room__buttons-pill">
				<ButtonMuteMic />
				<ButtonDeafen />
				<ButtonToggleVideo />
				<Button onclick={() => (appsShown = true)}>
					<SvgApps width={24} height={24} />
				</Button>
				<ButtonDisconnect />
			</div>
			<div id="room__buttons-right">
				<ButtonChatToggle />
			</div>
		</div>
	</section>
</main>

<style>
	#room {
		display: flex;
		flex-direction: column;
		animation: fade-in 0.8s ease-out forwards;
	}

	#room__talk {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 4rem);
		flex-grow: 1;
		margin: 0.5rem;
	}

	#room__main-content {
		display: flex;
		flex: 2;
		position: relative;
		min-height: 0;
	}

	#room__videos {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
		flex: 1;
		min-height: 0;
		height: 100%;
		width: 100%;
		gap: 0.5rem;
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

	@media screen and (max-width: 1240px) {
		#room__videos {
			grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		}
	}

	@media screen and (max-width: 850px) {
		#room__videos {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}

	@media screen and (max-width: 768px) {
		#room__videos {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		}
	}
</style>
