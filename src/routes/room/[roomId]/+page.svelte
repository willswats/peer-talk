<script lang="ts">
	import Room from '$lib/components/Room.svelte';
	import JoinSettings from '$lib/components/JoinSettings.svelte';
	import { validate as uuidvalidate } from 'uuid';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { generateRandomUsername } from '$lib/utils/generateRandomUsername';
	import { userState } from '$lib/state.svelte';

	let roomValid: boolean = $state(false);
	let joinRoomButtonPressed: boolean = $state(false);

	onMount(() => {
		let checkRoomId = $page.params.roomId;
		roomValid = uuidvalidate(checkRoomId);

		if (roomValid) {
			userState.username = generateRandomUsername();
			userState.roomId = checkRoomId;
		}
	});
</script>

{#if !roomValid}
	<main>
		<p>Invalid room</p>
	</main>
{:else if joinRoomButtonPressed || userState.joinedRoom}
	<Room />
{:else}
	<JoinSettings bind:joinRoomButtonPressed />
{/if}
