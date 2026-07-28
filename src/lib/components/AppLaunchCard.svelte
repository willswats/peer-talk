<script lang="ts">
	import type { embeddedApp as embeddedAppType } from '$lib/state.svelte';

	interface Props {
		embeddedApp: embeddedAppType;
		embeddedApps: embeddedAppType[];
	}

	let { embeddedApp, embeddedApps }: Props = $props();

	function handleOnClickLaunch() {
		embeddedApps.forEach((app) => (app.render = false));

		const app = embeddedApps.find((app) => app.id === embeddedApp.id);
		if (app) {
			app.render = true;
		}
	}
</script>

<figure>
	<figcaption>
		<h2>
			{embeddedApp.title}
		</h2>
		<!-- <p>{embeddedApp.description}</p> -->
		<a href={embeddedApp.git} target="_blank" rel="external noreferrer">Source</a>
	</figcaption>
	<section>
		<button onclick={() => handleOnClickLaunch()}>Launch</button>
	</section>
</figure>

<style>
	figure {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 100%;
		height: 10rem;
		border-radius: var(--border-radius-normal);
		overflow: hidden;
		background-color: var(--bg-secondary);
		border: 1px solid var(--border);
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
