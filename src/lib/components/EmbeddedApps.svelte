<script lang="ts">
	import { apps } from '@/apps.json';
	import { userState } from '$lib/state.svelte';

	interface embeddedApp {
		id: string;
		title: string;
		url: string;
		userConsent: boolean;
	}

	let embeddedApps: embeddedApp[] = $state([]);

	// Init the embededApps state with the data from apps.json
	for (let app of apps) {
		app.url += userState.roomId;
		embeddedApps.push({ ...app, userConsent: false });
	}
</script>

<section>
	{#each embeddedApps as embeddedApp (embeddedApp.id)}
		{#if embeddedApp.userConsent}
			<div>
				<iframe
					id={embeddedApp.id}
					title={embeddedApp.title}
					width="500"
					height="500"
					allow="fullscreen"
					src={embeddedApp.url}
				>
				</iframe>
				<button
					onclick={() => {
						const iframe = document.querySelector(`#${embeddedApp.id}`);
						if (iframe) {
							iframe.requestFullscreen();
						}
					}}>Fullscreen</button
				>
			</div>
		{:else}
			<div>
				<p>{embeddedApp.title}</p>
				<p>Press the button if you consent to rendering the app</p>
				<button
					onclick={() => {
						const app = embeddedApps.find((app) => app.id === embeddedApp.id);
						if (app) {
							console.log(app);
							app.userConsent = true;
						}
					}}>Consent</button
				>
			</div>
		{/if}
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
