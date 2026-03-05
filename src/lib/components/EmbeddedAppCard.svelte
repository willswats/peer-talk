<script lang="ts">
	import type { embeddedApp as embeddedAppType } from '$lib/state.svelte';

	interface Props {
		embeddedApp: embeddedAppType;
		embeddedApps: embeddedAppType[];
		roomId: string | undefined;
	}

	let { embeddedApp, embeddedApps, roomId }: Props = $props();

	let embeddedAppElement: HTMLIFrameElement | null = $state(null);

	function handleOnClickConsent() {
		const app = embeddedApps.find((app) => app.id === embeddedApp.id);
		if (app) {
			app.userConsent = !app.userConsent;
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
		{#if !embeddedApp.userConsent}
			<h2>
				<a href={embeddedApp.git} target="_blank" rel="external noreferrer">{embeddedApp.title}</a>
			</h2>
			<p>{embeddedApp.description}</p>
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
		{#if !embeddedApp.userConsent}
			<button onclick={handleOnClickConsent}>Consent</button>
		{:else}
			<button onclick={handleOnClickConsent}>Un-consent</button>
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
		background-color: var(--mantle);
	}

	figure figcaption {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	figure figcaption h2 {
		font-size: 2rem;
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
		color: #fff;
		background-color: var(--crust);
		padding: 0.5rem;
		transition: background-color 0.1s;
		font-size: 1rem;
	}

	figure section button:nth-of-type(2) {
		border-left: 1px solid var(--base);
	}

	iframe {
		width: 100%;
		height: 100%;
	}
</style>
