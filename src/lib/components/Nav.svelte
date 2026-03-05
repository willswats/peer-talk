<script lang="ts">
	import { resolve } from '$app/paths';
	import { v4 as uuidv4 } from 'uuid';
	import { userState } from '$lib/state.svelte';
	import { page } from '$app/state';

	let uuid = uuidv4();

	const userOnPage = (url: string) => page.url.pathname === url;
</script>

<nav>
	<section class="nav-menu">
		<a class:nav-menu-a-enabled={userOnPage(`/`)} href={resolve('/')}>Home</a>
		{#if userState.joinedRoom && userState.roomId}
			<a
				class:nav-menu-a-enabled={userOnPage(`/room/${userState.roomId}`)}
				href={resolve(`/room/${userState.roomId}`)}>Room</a
			>
		{:else}
			<a class:nav-menu-a-enabled={userOnPage(`/room/${uuid}`)} href={resolve(`/room/${uuid}`)}
				>Create Room</a
			>
		{/if}
	</section>
</nav>

<style>
	nav {
		display: flex;
		width: 100%;
		height: 3rem;
		background-color: var(--mantle);
		overflow: hidden;
	}

	.nav-menu {
		display: flex;
		text-wrap: nowrap;
	}

	.nav-menu a {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		font-size: 1.2rem;
		transition: background-color 0.1s;
	}

	.nav-menu-a-enabled {
		background-color: var(--crust);
	}
</style>
