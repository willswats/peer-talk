<script lang="ts">
	import { userState, embeddedApps } from '$lib/state.svelte';
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
					src={`${embeddedApp.url}${userState.roomId}`}
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
