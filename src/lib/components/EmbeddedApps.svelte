<script lang="ts">
	import { userState, embeddedApps } from '$lib/state.svelte';
	import EmbeddedAppCard from '$lib/components/EmbeddedAppCard.svelte';
</script>

{#each embeddedApps as embeddedApp (embeddedApp.id)}
	<EmbeddedAppCard {embeddedApp} {embeddedApps} roomId={userState.roomId} />
{/each}
