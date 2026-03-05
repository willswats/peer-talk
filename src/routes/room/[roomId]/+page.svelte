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
		<p>Invalid room</p>
	</main>
{:else if userState.joinedRoom}
	<Room />
{:else}
	<JoinSettings />
{/if}
