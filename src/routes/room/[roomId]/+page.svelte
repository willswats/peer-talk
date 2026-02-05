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
	let room: string | undefined = $state(undefined);
	let roomValid: boolean = $state(false);

	let joinRoomButtonPressed: boolean = $state(false);

	onMount(() => {
		room = $page.params.roomId;
		roomValid = uuidvalidate(room);

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
	<Room {username} {room} {localMicStream} {localVideoStream} />
{:else}
	<JoinSettings
		bind:joinRoomButtonPressed
		bind:localMicStream
		bind:localVideoStream
		bind:username
	/>
{/if}
