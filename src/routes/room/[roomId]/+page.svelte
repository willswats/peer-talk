<script lang="ts">
	import Room from '$lib/components/Room.svelte';
	import JoinSettings from '$lib/components/JoinSettings.svelte';
	import { validate as uuidvalidate } from 'uuid';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { generateRandomUsername } from '$lib/utils/generateRandomUsername';

	let localMicStream: MediaStream | null = $state(null);
	let localVideoStream: MediaStream | null = $state(null);

	let username: string = $state('');
	let roomId: string | undefined = $state(undefined);
	let roomValid: boolean = $state(false);

	let joinRoomButtonPressed: boolean = $state(false);

	onMount(() => {
		roomId = $page.params.roomId;
		roomValid = uuidvalidate(roomId);

		if (roomValid) {
			username = generateRandomUsername();
		}
	});
</script>

{#if !roomValid}
	<main>
		<p>Invalid room</p>
	</main>
{:else if joinRoomButtonPressed}
	<Room {username} {roomId} {localMicStream} {localVideoStream} />
{:else}
	<JoinSettings
		bind:joinRoomButtonPressed
		bind:localMicStream
		bind:localVideoStream
		bind:username
	/>
{/if}
