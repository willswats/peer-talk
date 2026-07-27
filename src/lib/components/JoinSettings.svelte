<script lang="ts">
	import Video from '$lib/components/Video.svelte';
	import { peerState, resetUserState, userState } from '$lib/state.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button, ButtonToggleVideo, ButtonMuteMic } from '$lib/components/Buttons';
	import CustomAlert from '$lib/components/CustomAlert.svelte';

	let hasLocalVideo = $state(false);

	// CustomAlert variables
	let customAlertText = $state('');
	let alertShown = $state(false);

	async function getMediaWithFallback() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: {
					autoGainControl: true,
					echoCancellation: true,
					noiseSuppression: true
				}
			});

			userState.localVideoEnabled = true;
			userState.localMicEnabled = true;

			return stream;
		} catch (error: any) {
			if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
				try {
					const audioStream = await navigator.mediaDevices.getUserMedia({
						audio: {
							autoGainControl: true,
							echoCancellation: true,
							noiseSuppression: true
						}
					});

					userState.localMicEnabled = true;

					return audioStream;
				} catch (audioError) {
					throw new Error('Could not access any media devices');
				}
			} else {
				throw error;
			}
		}
	}

	async function handleOnClickPerms() {
		try {
			userState.localStream = await getMediaWithFallback();
		} catch (error) {
			console.log('Error getting permissions', error);
		}
	}

	function handleOnClickJoinRoom() {
		if (userState.localStream === null) {
			alertShown = true;
			customAlertText =
				'You must grant permissions and have an available microphone/camera to join the room.';
		} else if (userState.username.length <= 0) {
			alertShown = true;
			customAlertText = 'Username cannot be empty.';
		} else if (userState.username.length >= 30) {
			alertShown = true;
			customAlertText = 'Username must be shorter than 30 characters.';
		} else {
			peerState.socket.emit('join-room', userState.roomId, userState.username);
			userState.joinedRoom = true;
		}
	}

	function handleOnClickLeaveRoom() {
		resetUserState();
		goto(resolve('/'));
	}

	$effect(() => {
		if (userState.localStream) {
			hasLocalVideo = userState.localStream.getVideoTracks().length > 0;
		}
	});
</script>

<main>
	<CustomAlert
		confirmFunction={() => {
			alertShown = false;
		}}
		bind:alertShown
		showCancelButton={false}>{customAlertText}</CustomAlert
	>
	<section>
		<h1>Settings</h1>
		<p>To join the room, you must grant permission for the app to use your camera/microphone.</p>
		<div>
			<button class="btn-peach" onclick={handleOnClickPerms}>Grant Permissions</button>
		</div>
		<div id="video-container">
			{#if hasLocalVideo}
				<Video
					username={userState.username}
					videoStream={userState.localStream}
					muted={true}
					--background-color="var(--bg-tertiary)"
				/>
			{:else}
				No camera currently available
			{/if}
		</div>
		<label for="input-username">Username:</label>
		<input id="input-username" type="text" bind:value={userState.username} />
		<div>
			<ButtonMuteMic
				--btn-bg-colour="var(--bg-tertiary)"
				--btn-bg-hover="var(--bg-tertiary)"
				--btn-border="var(--border)"
			/>
			<ButtonToggleVideo
				--btn-bg-colour="var(--bg-tertiary)"
				--btn-bg-hover="var(--bg-tertiary)"
				--btn-border="var(--border)"
			/>
		</div>
		<div id="join-leave-buttons">
			<Button
				--btn-bg-colour="var(--bg-tertiary)"
				--btn-bg-hover="var(--bg-tertiary)"
				--btn-border="var(--border)"
				onclick={handleOnClickJoinRoom}>Join Room</Button
			>
			<Button
				--btn-bg-colour="var(--bg-tertiary)"
				--btn-bg-hover="var(--bg-tertiary)"
				--btn-border="var(--border)"
				onclick={handleOnClickLeaveRoom}>Leave Room</Button
			>
		</div>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		margin: 2rem;
	}

	h1 {
		color: var(--mauve);
	}

	#video-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 20rem;
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		margin-top: 0.5rem;
		border: 1px solid var(--border);
	}

	section {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-secondary);
		border-radius: var(--border-radius-normal);
		padding: 2rem;
		width: 30rem;
		border: 1px solid var(--border);
	}

	label {
		margin-top: 0.5rem;
	}

	input {
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
	}

	div {
		display: flex;
	}

	div {
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	#join-leave-buttons {
		display: flex;
	}

	button {
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
	}

	@media screen and (max-width: 768px) {
		section {
			width: 18rem;
			padding: 1rem;
		}

		#video-container {
			height: 15rem;
		}

		#join-leave-buttons {
			flex-direction: column;
		}
	}
</style>
