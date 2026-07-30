<script lang="ts">
	import Room from '$lib/components/Room.svelte';
	import JoinSettings from '$lib/components/JoinSettings.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { userState } from '$lib/state.svelte';
	import { setUserRoomIdAndUserName } from '$lib/utils/setUserRoomIdAndUsername';

	let roomValid: boolean = $state(false);

	onMount(() => {
		let roomId = $page.params.roomId;
		if (roomId) {
			roomValid = setUserRoomIdAndUserName(roomId);
		}
	});
</script>

{#if !roomValid}
	<main>
		<p>Invalid room, are you sure the room id is correct?</p>
	</main>
{:else if userState.joinedRoom}
	<Room />
{:else}
	<JoinSettings />
{/if}

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-grow: 1;
		margin: 1rem;
		animation: fade-in 0.8s ease-out forwards;
	}

	p {
		background-color: var(--bg-secondary);
		padding: 1rem;
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
		font-size: 1.4rem;
	}

	@media screen and (max-width: 768px) {
		p {
			font-size: 1rem;
		}
	}
</style>
