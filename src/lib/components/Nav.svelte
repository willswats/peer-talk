<script lang="ts">
	import { resolve } from '$app/paths';
	import { userState } from '$lib/state.svelte';
	import { page } from '$app/state';
	import { createRoom } from '$lib/utils/createRoom';

	const userOnPage = (url: string) => page.url.pathname === url;
</script>

<nav>
	<section class="nav-menu">
		<a class:nav-menu-a-enabled={userOnPage(`/`)} href={resolve('/')}>Home</a>
		{#if userState.roomId}
			<a
				class:nav-menu-a-enabled={userOnPage(`/room/${userState.roomId}`)}
				href={resolve(`/room/${userState.roomId}`)}>Room</a
			>
		{:else}
			<button onclick={createRoom}>Create Room</button>
		{/if}
	</section>
</nav>

<style>
	nav {
		display: flex;
		width: 100%;
		height: 3rem;
		overflow: hidden;
	}

	.nav-menu {
		display: flex;
		text-wrap: nowrap;
	}

	a,
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		font-size: 1.2rem;
		transition: background-color 0.1s;
		border-radius: var(--border-radius-normal);
		margin-left: 0.25rem;
		background-color: var(--bg-secondary);
		margin-top: 0.1rem;
	}

	.nav-menu-a-enabled {
		background-color: var(--bg-tertiary);
	}

	@media screen and (max-width: 768px) {
		.nav-menu a,
		button {
			font-size: 1rem;
		}
	}
</style>
