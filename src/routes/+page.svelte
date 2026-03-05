<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { userState } from '@/lib/state.svelte';
	import { setUserRoomIdAndUserName } from '$lib/utils/setUserRoomIdAndUsername';
	import { createRoom } from '$lib/utils/createRoom';

	let roomIdInput = $state('');
</script>

<main>
	<section>
		<h1>PeerTalk</h1>
		<p>
			A web application for peer-to-peer text and voice communication with an open marketplace of
			embedded single page applications.
		</p>
		<div>
			<button onclick={createRoom}>Create Room</button>
		</div>
		<form
			onsubmit={(event) => {
				event.preventDefault();
				const roomValid = setUserRoomIdAndUserName(roomIdInput);

				if (roomValid) {
					goto(resolve(`/room/${userState.roomId}`));
				}
			}}
		>
			<input type="text" placeholder="roomId..." bind:value={roomIdInput} />
			<button>Enter Room</button>
		</form>
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
		font-size: 3rem;
		background-image: linear-gradient(120deg, var(--peach), var(--mauve));
		background-clip: text;
		color: transparent;
	}

	p {
		font-size: 1.5rem;
	}

	section > * {
		margin-bottom: 0.5rem;
	}

	section {
		display: flex;
		flex-direction: column;
		background-color: var(--mantle);
		padding: 2rem;
		border-radius: var(--border-radius-normal);
		width: 45rem;
	}

	div {
		display: flex;
	}

	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
		font-size: 1.2rem;
	}

	input {
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
		font-size: 1.2rem;
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		p {
			font-size: 1.2rem;
		}

		button {
			font-size: 1rem;
		}

		input {
			font-size: 1rem;
		}

		section {
			width: 20rem;
		}
	}
</style>
