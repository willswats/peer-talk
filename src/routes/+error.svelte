<script lang="ts">
	import { page } from '$app/state';
</script>

<main>
	{#if page.error}
		<p>Something went wrong: {page.status} {page.error.message}</p>
	{:else}
		<p>Something went wrong...</p>
	{/if}
</main>

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
