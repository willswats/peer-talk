<script lang="ts">
	import { userState } from '$lib/state.svelte';
	import type { marketplaceApp as marketplaceAppType } from '$lib/state.svelte';

	interface Props {
		marketplaceApp: marketplaceAppType;
		marketplaceApps: marketplaceAppType[];
	}

	let { marketplaceApp, marketplaceApps }: Props = $props();

	function handleOnClickLaunch() {
		marketplaceApps.forEach((app) => (app.render = false));

		const app = marketplaceApps.find((app) => app.id === marketplaceApp.id);
		if (app) {
			app.render = true;
			userState.appLaunched = true;
		}
	}

	let windowWidth = $state(0);
	let isMobile = $derived(windowWidth <= 768);

	$effect(() => {
		const updateWidth = () => {
			windowWidth = window.innerWidth;
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});
</script>

<figure>
	<figcaption>
		<div>
			<h2>
				{marketplaceApp.title}
			</h2>
			<a href={marketplaceApp.git} target="_blank" rel="external noreferrer">(source)</a>
		</div>
		<p>
			{#if !isMobile}
				{marketplaceApp.description}
			{:else}
				{marketplaceApp.short_description}
			{/if}
		</p>
	</figcaption>
	<section>
		<button onclick={() => handleOnClickLaunch()}>Launch</button>
	</section>
</figure>

<style>
	figure {
		display: flex;
		width: 100%;
		min-height: 4rem;
		border-radius: var(--border-radius-normal);
		overflow: hidden;
		background-color: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	figure figcaption {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		height: 100%;
		overflow: hidden;
		min-width: 0;
		flex: 1;
		gap: 0.5rem;
		padding: 0.5rem;
	}

	figure div {
		display: flex;
		white-space: nowrap;
		flex-shrink: 0;
	}

	figure div h2 {
		font-size: 1.4rem;
		color: var(--blue);
	}

	figure div a {
		margin-left: 0.2rem;
	}

	figure figcaption p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		min-width: 0;
		flex: 1;
		font-size: 1.2rem;
	}

	figure section {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		padding: 0.5rem;
	}

	figure section button {
		text-align: center;
		color: var(--text);
		background-color: var(--bg-tertiary);
		padding: 0.5rem 1rem;
		transition: background-color 0.1s;
		font-size: 1rem;
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
	}

	a {
		font-size: 1.2rem;
		color: var(--mauve);
	}

	a:hover {
		text-decoration: underline;
	}

	@media screen and (max-width: 768px) {
		figure div {
			flex-direction: column;
		}

		figure div a {
			margin-left: 0;
		}

		figure figcaption h2 {
			font-size: 1.4rem;
		}

		figure figcaption p {
			font-size: 1rem;
		}

		a {
			font-size: 1rem;
		}
	}
</style>
