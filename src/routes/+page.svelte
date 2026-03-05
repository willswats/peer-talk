<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { v4 as uuidv4, validate as uuidvalidate } from 'uuid';

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
			<a href={resolve(`/room/${uuidv4()}`)}>Create Room</a>
		</div>
		<form
			onsubmit={(event) => {
				event.preventDefault();

				const roomValid = uuidvalidate(roomIdInput);
				if (roomValid) {
					goto(resolve(`/room/${roomIdInput}`));
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

	section > * {
		margin-bottom: 0.5rem;
	}

	section {
		display: flex;
		flex-direction: column;
		background-color: var(--mantle);
		padding: 2rem;
		border-radius: var(--border-radius-normal);
		width: 20rem;
	}

	div {
		display: flex;
	}

	a {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
	}

	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
	}

	input {
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
	}

	@media screen and (min-width: 768px) {
		section {
			width: 45rem;
		}
	}
</style>
