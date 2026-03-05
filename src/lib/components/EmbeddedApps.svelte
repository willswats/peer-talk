<script lang="ts">
	import { userState, embeddedApps } from '$lib/state.svelte';
	import EmbeddedAppCard from '$lib/components/EmbeddedAppCard.svelte';
</script>

<section>
	{#each embeddedApps as embeddedApp (embeddedApp.id)}
		<EmbeddedAppCard {embeddedApp} {embeddedApps} roomId={userState.roomId} />
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media screen and (min-width: 768px) {
		section {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
