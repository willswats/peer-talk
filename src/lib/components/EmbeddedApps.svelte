<script lang="ts">
	import { userState, embeddedApps } from '$lib/state.svelte';
	import EmbeddedAppCard from '$lib/components/EmbeddedAppCard.svelte';
</script>

<section id="embedded-apps">
	{#each embeddedApps as embeddedApp (embeddedApp.id)}
		<EmbeddedAppCard {embeddedApp} {embeddedApps} roomId={userState.roomId} />
	{/each}
</section>

<style>
	#embedded-apps {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
	}

	@media screen and (min-width: 768px) {
		#embedded-apps {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
