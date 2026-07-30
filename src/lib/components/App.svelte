<script lang="ts">
	import { userState } from '$lib/state.svelte';
	import type { marketplaceApp as marketplaceAppType } from '$lib/state.svelte';

	interface Props {
		marketplaceApp: marketplaceAppType;
		marketplaceApps: marketplaceAppType[];
		roomId: string | undefined;
	}

	let { marketplaceApp, marketplaceApps, roomId }: Props = $props();

	let marketplaceAppElement: HTMLIFrameElement | null = $state(null);

	function handleOnClickClose() {
		marketplaceApps.forEach((app) => (app.render = false));
		userState.appLaunched = false;
	}

	function handleOnClickFullScreen() {
		if (marketplaceAppElement) {
			marketplaceAppElement.requestFullscreen();
		}
	}
</script>

{#if marketplaceApp.render}
	<figure>
		<figcaption>
			<iframe
				id={marketplaceApp.id}
				title={marketplaceApp.title}
				allow="fullscreen"
				src={`${marketplaceApp.url}${roomId}`}
				bind:this={marketplaceAppElement}
			>
			</iframe>
		</figcaption>
		<section>
			<button onclick={handleOnClickClose}>Close app</button>
			<button onclick={handleOnClickFullScreen}>Fullscreen</button>
		</section>
	</figure>
{/if}

<style>
	figure {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	:fullscreen {
		background-color: #fff;
	}

	figure figcaption {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	figure section {
		display: flex;
	}

	figure section button {
		text-align: center;
		width: 100%;
		color: var(--text);
		background-color: var(--bg-tertiary);
		padding: 0.5rem;
		transition: background-color 0.1s;
		font-size: 1rem;
		border-radius: 0;
		border: 0;
		border-top: 1px solid var(--border);
	}

	figure section button:nth-of-type(2) {
		border-left: 1px solid var(--border);
	}

	iframe {
		width: 100%;
		height: 100%;
	}
</style>
