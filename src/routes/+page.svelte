<script>
	import { v4 as uuidv4 } from 'uuid';
</script>

<main>
	<section>
		<h1>PeerTalk</h1>
		<p>
			A web application for peer-to-peer text and voice communication with an open marketplace of
			embedded single page applications.
		</p>
		<div>
			<a href={`/room/${uuidv4()}`}>Create Room</a>
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
		width: 45rem;
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

	@media screen and (width <= 768px) {
		section {
			width: 20rem;
		}
	}
</style>
