<script lang="ts">
	import Room from '$lib/components/Room.svelte';
	import JoinSettings from '$lib/components/JoinSettings.svelte';
	import { validate as uuidvalidate } from 'uuid';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { generateRandomUsername } from '$lib/utils/generateRandomUsername';
	import { userState } from '$lib/state.svelte';

	let localMicStream: MediaStream | null = $state(null);
	let localVideoStream: MediaStream | null = $state(null);

	let username: string = $state('');
	let roomValid: boolean = $state(false);

	onMount(() => {
		userState.roomId = $page.params.roomId;
		roomValid = uuidvalidate(userState.roomId);

		if (roomValid) {
			username = generateRandomUsername();
		}
	});
</script>

{#if !roomValid}
	<main>
		<p>Invalid room</p>
	</main>
{:else if userState.joinedRoom}
	<Room {username} {localMicStream} {localVideoStream} />
{:else}
	<JoinSettings bind:localMicStream bind:localVideoStream bind:username />
{/if}
