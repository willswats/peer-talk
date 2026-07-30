<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { userState } from '@/lib/state.svelte';
	import { setUserRoomIdAndUserName } from '$lib/utils/setUserRoomIdAndUsername';
	import { createRoom } from '$lib/utils/createRoom';
	import {
		Apps,
		Store,
		ChatPrivate,
		OpenSource,
		VideoChat,
		ChatLine,
		SvgGitHub
	} from '$lib/components/svg';
	import Button from '@/lib/components/Buttons/Button.svelte';
	import ImagePeerTalk from '$lib/assets/img/peer-talk.png';

	let roomIdInput = $state('');
</script>

<main id="home">
	<section class="page">
		<section id="home__info">
			<div id="home__info-top">
				<h1>PeerTalk</h1>
				<p>
					Real-time video calls with built-in collaborative tools. Start a private peer-to-peer
					call, share ideas, and work together instantly - no account required.
				</p>
				<div>
					<button class="btn-animated" onclick={createRoom}>Create Room</button>
				</div>
			</div>

			<div id="home__info-bottom">
				<p>Have a room link already? Enter it below to join the room.</p>
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
					<div>
						<input type="text" placeholder="Room link..." bind:value={roomIdInput} />
					</div>
					<div>
						<Button
							--btn-bg-colour="var(--bg-secondary)"
							--btn-bg-hover="var(--bg-tertiary)"
							--btn-border="var(--border)">Enter</Button
						>
					</div>
				</form>
			</div>
			<div id="home__img">
				<img src={ImagePeerTalk} alt="Screenshot of Peer Talk" />
			</div>
		</section>
	</section>

	<section class="page">
		<h2>Unique Features Set</h2>
		<p>Peer Talk was built from the ground up to be private, open and transparent.</p>
		<div id="home__grid">
			<div class="home__grid-item">
				<span class="home__grid-item-svg">
					<ChatPrivate width={80} height={80} />
				</span>
				<div class="home__grid-item-text">
					<h3>Private Peer-to-Peer Calls</h3>
					<p>
						WebRTC encryption keeps your conversations secure. PeerTalk never collects or shares
						your personal information.
					</p>
				</div>
			</div>
			<div class="home__grid-item">
				<span class="home__grid-item-svg">
					<Apps width={80} height={80} />
				</span>
				<div class="home__grid-item-text">
					<h3>Collaborative Apps</h3>
					<p>Use shared tools such as a Whiteboard or Document Editor together during a call.</p>
				</div>
			</div>
			<div class="home__grid-item">
				<span class="home__grid-item-svg">
					<Store width={80} height={80} />
				</span>
				<div class="home__grid-item-text">
					<h3>Open App Marketplace</h3>
					<p>A community-driven library of apps. Contribute on GitHub!</p>
				</div>
			</div>
			<div class="home__grid-item">
				<span class="home__grid-item-svg">
					<ChatLine width={80} height={80} />
				</span>
				<div class="home__grid-item-text">
					<h3>Rich Chat</h3>
					<p>Send messages with full emoji support.</p>
				</div>
			</div>
			<div class="home__grid-item">
				<span class="home__grid-item-svg">
					<VideoChat width={80} height={80} />
				</span>
				<div class="home__grid-item-text">
					<h3>Call Controls</h3>
					<p>Mute, deafen, or hide your video with ease.</p>
				</div>
			</div>
			<div class="home__grid-item">
				<span class="home__grid-item-svg">
					<OpenSource width={80} height={80} />
				</span>
				<div class="home__grid-item-text">
					<h3>Free & Open Source</h3>
					<p>Licensed under AGPL 3.0. Always free, always transparent.</p>
				</div>
			</div>
		</div>
	</section>
	<footer id="home__footer">
		<a
			class="svg-link"
			href="https://github.com/willswats/peer-talk"
			target="_blank"
			rel="noopener noreferrer"><SvgGitHub width={24} height={24} /></a
		>
		<a href="https://williamwatson.dev" target="_blank" rel="noopener noreferrer"
			>williamwatson.dev</a
		>
	</footer>
</main>

<style>
	h1 {
		font-size: 3rem;
		background-image: linear-gradient(120deg, var(--peach), var(--mauve));
		background-clip: text;
		color: transparent;
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 2rem;
		text-align: center;
		color: var(--blue);
		margin-bottom: 0.5rem;
	}

	h3 {
		font-size: 1.4rem;
		color: var(--mauve);
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 1.2rem;
		text-align: center;
		margin-bottom: 0.5rem;
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

	.page {
		display: flex;
		flex-direction: column;
		max-width: 50rem;
		padding: 4rem 1rem;
		animation: fadeIn 0.8s ease-out forwards;
	}

	#home {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}

	#home__info-top {
		text-align: center;
		margin-bottom: 2rem;
	}

	#home__info-top p {
		font-size: 1.4rem;
	}

	#home__info-bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
	}

	#home__info-bottom input {
		background-color: var(--bg-secondary);
	}

	#home__img {
		display: flex;
		flex-direction: column;
	}

	#home__img img {
		border: 1px solid var(--border);
		border-radius: var(--border-radius-normal);
		max-width: 100%;
		max-height: 100%;
		transition:
			transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	#home__img img:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	#home__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.home__grid-item {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--border-radius-large);
		background-color: var(--bg-secondary);
		padding: 1rem;
		height: 14rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.home__grid-item:hover {
		transform: translateY(-4px) scale(1.02);
		border-color: var(--mauve);
		background-color: var(--bg-tertiary);
	}

	.home__grid-item-svg {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.home__grid-item-text {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.home__grid-item-text p {
		font-size: 1rem;
	}

	#home__footer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		width: 100%;
		background-color: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	#home__footer a {
		margin-right: 5px;
		text-align: center;
	}

	#home__footer a:hover {
		color: var(--mauve);
		text-decoration: underline;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media screen and (max-width: 768px) {
		#home__grid {
			display: grid;
			grid-template-columns: 1fr;
		}

		#home__info-top p {
			font-size: 1.2rem;
		}

		h2 {
			font-size: 1.6rem;
		}

		h3 {
			font-size: 1.2rem;
		}

		p {
			font-size: 1rem;
		}
	}
</style>
