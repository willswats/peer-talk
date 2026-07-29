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
		<h2>Create a Room</h2>
		<p id="home__room-instruction">Create a room to get started, or join a room with a link.</p>
		<div>
			<button class="btn-blue" onclick={createRoom}>Create Room</button>
		</div>
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
	</section>
	<div id="home__features">
		<h2>Unique Features Set</h2>
		<p>Peer Talk was built from the ground up to be private, open and transparent.</p>
		<div id="home__features-grid">
			<div class="home__features-grid-item">
				<span>
					<ChatPrivate width={128} height={128} />
				</span>
				<h3>Private Peer-to-Peer Calls</h3>
				<p>
					WebRTC encryption keeps your conversations secure. PeerTalk never collects or shares your
					personal information.
				</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<Apps width={128} height={128} />
				</span>
				<h3>Collaborative Apps</h3>
				<p>Use shared tools such as a Whiteboard or Document Editor together during a call.</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<Store width={128} height={128} />
				</span>
				<h3>Open App Marketplace</h3>
				<p>A community-driven library of apps. Contribute on GitHub!</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<ChatLine width={128} height={128} />
				</span>
				<h3>Rich Chat</h3>
				<p>Send messages with full emoji support.</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<VideoChat width={128} height={128} />
				</span>
				<h3>Call Controls</h3>
				<p>Mute, deafen, or hide your video with ease.</p>
			</div>
			<div class="home__features-grid-item">
				<span>
					<OpenSource width={128} height={128} />
				</span>
				<h3>Free & Open Source</h3>
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
		margin-top: 4rem;
	}

	#home__description {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--bg-primary);
		padding: 2rem;
		border-radius: var(--border-radius-normal);
		text-align: center;
		max-width: 45rem;
	}

	#home__description h1 {
		font-size: 3rem;
		background-image: linear-gradient(120deg, var(--peach), var(--mauve));
		background-clip: text;
		color: transparent;
	}

	#home__description p {
		font-size: 1.5rem;
	}

	#home__room {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-secondary);
		border-radius: var(--border-radius-normal);
		padding: 2rem;
		border: 1px solid var(--border);
		max-width: 60rem;
	}

	#home__room h2 {
		color: var(--blue);
	}

	#home__room p {
		font-size: 1.2rem;
	}

	#home__room > * {
		margin-bottom: 0.5rem;
	}

	#home__features {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#home__features h2 {
		font-size: 2rem;
		text-align: center;
		color: var(--blue);
	}

	#home__features p {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	#home__features-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		max-width: 80rem;
	}

	.home__features-grid-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border: 1px solid var(--border);
		border-radius: var(--border-radius-large);
		background-color: var(--bg-secondary);
		padding: 1rem;
	}

	.home__features-grid-item h3 {
		font-size: 1.4rem;
		color: var(--mauve);
	}

	.home__features-grid-item p {
		font-size: 1.2rem;
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
		#home__features-grid {
			display: grid;
			grid-template-columns: 1fr;
		}
	}
</style>
