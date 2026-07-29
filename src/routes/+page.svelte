<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { userState } from '@/lib/state.svelte';
	import { setUserRoomIdAndUserName } from '$lib/utils/setUserRoomIdAndUsername';
	import { createRoom } from '$lib/utils/createRoom';
	import { Apps, Store, ChatPrivate, OpenSource, VideoChat, ChatLine } from '$lib/components/svg';
	import Button from '@/lib/components/Buttons/Button.svelte';

	let roomIdInput = $state('');
</script>

<main id="home">
	<section id="home__description">
		<h1>PeerTalk</h1>
		<p>
			Real-time video calls with built-in collaborative tools. Start a private peer-to-peer call,
			share ideas, and work together instantly - no account required.
		</p>
	</section>

	<section id="home__room">
		<p id="home__room-instruction">Create a room to get started, or join a room with a link.</p>

		<div id="home__room-create">
			<form
				onsubmit={(event) => {
					event.preventDefault();
					const uuid = roomIdInput.split('/').pop();
					if (uuid) {
						const roomValid = setUserRoomIdAndUserName(uuid);

						if (roomValid) {
							goto(resolve(`/room/${userState.roomId}`));
						}
					}
				}}
			>
				<input type="text" placeholder="Room link..." bind:value={roomIdInput} />
				<div>
					<Button
						--btn-bg-colour="var(--bg-tertiary)"
						--btn-bg-hover="var(--bg-tertiary)"
						--btn-border="var(--border)">Enter</Button
					>
				</div>
			</form>
			<button class="btn-blue" onclick={createRoom}>Create Room</button>
		</div>
	</section>
	<div id="home__features">
		<h1>Features</h1>
		<div id="home__features-grid">
			<div class="home__features-grid-item">
				<span>
					<ChatPrivate width={128} height={128} />
				</span>
				<h2>Private Peer-to-Peer Calls</h2>
				<p>
					WebRTC encryption keeps your conversations secure. PeerTalk never collects or shares your
					personal information.
				</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<Apps width={128} height={128} />
				</span>
				<h2>Collaborative Apps</h2>
				<p>Use shared tools such as a Whiteboard or Document Editor together during a call.</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<Store width={128} height={128} />
				</span>
				<h2>Open App Marketplace</h2>
				<p>A community-driven library of apps. Contribute on GitHub!</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<ChatLine width={128} height={128} />
				</span>
				<h2>Rich Chat</h2>
				<p>Send messages with full emoji support.</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<VideoChat width={128} height={128} />
				</span>
				<h2>Call Controls</h2>
				<p>Mute, deafen, or hide your video with ease.</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<OpenSource width={128} height={128} />
				</span>
				<h2>Free & Open Source</h2>
				<p>Licensed under AGPL 3.0. Always free, always transparent.</p>
			</div>
		</div>
	</div>
</main>

<style>
	#home {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		align-items: center;
		margin: 2rem;
	}

	#home > * {
		margin-bottom: 1rem;
	}

	#home__description {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 45rem;
		background-color: var(--bg-secondary);
		padding: 2rem;
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
	}

	#home__room {
		display: grid;
		grid-template-columns: 1fr 1fr;
		background-color: var(--bg-secondary);
		border-radius: var(--border-radius-normal);
		padding: 2rem;
		width: 45rem;
		border: 1px solid var(--border);
	}

	#home__room-instruction {
		text-align: center;
	}

	#home__room > * {
		margin-bottom: 0.5rem;
	}

	#home__room-create {
		display: flex;
		flex-direction: column;
	}

	#home__features {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 45rem;
		background-color: var(--bg-secondary);
		padding: 2rem;
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
	}

	#home__features-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.home__features-grid-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border: 1px solid var(--border);
		border-radius: var(--border-radius-large);
		padding: 1rem;
	}

	.home__features-grid-item h2 {
		color: var(--mauve);
	}

	.home__features-grid-item p {
		font-size: 1.2rem;
	}

	h1 {
		font-size: 3rem;
		background-image: linear-gradient(120deg, var(--peach), var(--mauve));
		background-clip: text;
		color: transparent;
	}

	p {
		font-size: 1.5rem;
	}

	div {
		display: flex;
	}

	button {
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
	}

	form {
		display: flex;
		gap: 0.5rem;
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		p {
			font-size: 1rem;
		}

		form {
			flex-direction: column;
		}

		section {
			width: 18rem;
			padding: 1rem;
		}
	}
</style>
