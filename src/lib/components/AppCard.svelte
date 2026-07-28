<script lang="ts">
	import type { embeddedApp as embeddedAppType } from '$lib/state.svelte';

	interface Props {
		embeddedApp: embeddedAppType;
		embeddedApps: embeddedAppType[];
		roomId: string | undefined;
	}

	let { embeddedApp, embeddedApps, roomId }: Props = $props();

	let embeddedAppElement: HTMLIFrameElement | null = $state(null);

	function handleOnClickClose() {
		embeddedApps.forEach((app) => (app.render = false));
	}

	function handleOnClickFullScreen() {
		if (embeddedAppElement) {
			embeddedAppElement.requestFullscreen();
		}
	}
</script>

{#if embeddedApp.render}
	<figure>
		<figcaption>
			<iframe
				id={embeddedApp.id}
				title={embeddedApp.title}
				allow="fullscreen"
				src={`${embeddedApp.url}${roomId}`}
				bind:this={embeddedAppElement}
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
		min-width: 0;
		min-height: 20rem;
		border-radius: var(--border-radius-normal);
		background-color: #fff;
		border: 1px solid var(--border);
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
