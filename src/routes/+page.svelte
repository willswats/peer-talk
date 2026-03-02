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
			<form
				onsubmit={(event) => {
					event.preventDefault();

					const roomValid = uuidvalidate(roomIdInput);
					if (roomValid) {
						goto(resolve(`/room/${roomIdInput}`));
					}
				}}
			>
				<input type="text" bind:value={roomIdInput} />
				<button>Enter Room</button>
			</form>
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

	section > * {
		margin-bottom: 0.5rem;
	}

	section {
		display: flex;
		flex-direction: column;
		background-color: #2a2a2a;
		border-radius: 25px;
		padding: 2rem;
		width: 20rem;
	}

	div {
		display: flex;
	}

	a {
		background-color: #3a3a3a;
		border-radius: 25px;
		padding: 1rem;
	}

	a:hover {
		background-color: #4a4a4a;
	}

	@media screen and (min-width: 768px) {
		section {
			width: 45rem;
		}
	}
</style>
