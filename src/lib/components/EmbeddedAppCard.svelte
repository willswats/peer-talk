<script lang="ts">
	import type { embeddedApp as embeddedAppType } from '$lib/state.svelte';

	interface Props {
		embeddedApp: embeddedAppType;
		embeddedApps: embeddedAppType[];
		roomId: string | undefined;
	}

	let { embeddedApp, embeddedApps, roomId }: Props = $props();

	let embeddedAppElement: HTMLIFrameElement | null = $state(null);

	function handleOnClickRender() {
		const app = embeddedApps.find((app) => app.id === embeddedApp.id);
		if (app) {
			app.render = !app.render;
		}
	}

	function handleOnClickFullScreen() {
		if (embeddedAppElement) {
			embeddedAppElement.requestFullscreen();
		}
	}
</script>

<figure>
	<figcaption>
		{#if !embeddedApp.render}
			<h2>
				{embeddedApp.title}
			</h2>
			<p>{embeddedApp.description}</p>
			<a href={embeddedApp.git} target="_blank" rel="external noreferrer">Source</a>
		{:else}
			<iframe
				id={embeddedApp.id}
				title={embeddedApp.title}
				allow="fullscreen"
				src={`${embeddedApp.url}${roomId}`}
				bind:this={embeddedAppElement}
			>
			</iframe>
		{/if}
	</figcaption>
	<section>
		{#if !embeddedApp.render}
			<button onclick={handleOnClickRender}>Run app</button>
		{:else}
			<button onclick={handleOnClickRender}>Close app</button>
			<button onclick={handleOnClickFullScreen}>Fullscreen</button>
		{/if}
	</section>
</figure>

<style>
	figure {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 100%;
		height: 30em;
		border-radius: var(--border-radius-normal);
		overflow: hidden;
		background-color: var(--bg-secondary);
	}

	figure figcaption {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 1rem;
	}

	figure figcaption h2 {
		font-size: 2rem;
		color: var(--blue);
	}

	figure figcaption a:hover {
		text-decoration: underline;
	}

	figure figcaption p {
		font-size: 1.2rem;
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
	}

	figure section button:nth-of-type(2) {
		border-left: 1px solid var(--bg-primary);
	}

	iframe {
		width: 100%;
		height: 100%;
	}

	a {
		font-size: 1.2rem;
		color: var(--mauve);
	}

	@media screen and (max-width: 768px) {
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
