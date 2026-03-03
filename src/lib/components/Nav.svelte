<script lang="ts">
	import { resolve } from '$app/paths';
	import { v4 as uuidv4 } from 'uuid';
	import { userState } from '$lib/state.svelte';
</script>

<nav>
	<a href={resolve('/')}>Home</a>
	{#if userState.joinedRoom && userState.roomId}
		<a href={resolve(`/room/${userState.roomId}`)}>Room</a>
	{:else}
		<a href={resolve(`/room/${uuidv4()}`)}>Create Room</a>
	{/if}
</nav>
