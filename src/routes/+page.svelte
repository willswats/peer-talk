<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { userState } from '@/lib/state.svelte';
	import { setUserRoomIdAndUserName } from '$lib/utils/setUserRoomIdAndUsername';
	import { createRoom } from '$lib/utils/createRoom';
	import Button from '@/lib/components/Buttons/Button.svelte';

	import CustomAlert from '$lib/components/CustomAlert.svelte';

	let roomIdInput = $state('');
</script>

<main>
	<CustomAlert />
	<section>
		<h1>PeerTalk</h1>
		<p>A web app for peer-to-peer group calls with collaborative applications.</p>
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
					--btn-border="var(--border)">Enter Room</Button
				>
			</div>
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
		background-color: var(--bg-secondary);
		padding: 2rem;
		border-radius: var(--border-radius-normal);
		width: 45rem;
		border: 1px solid var(--border);
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

	input {
		display: flex;
		flex: 1;
		border-radius: var(--border-radius-normal);
		padding: 0.5rem;
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
			width: 16rem;
			padding: 1rem;
		}
	}
</style>
