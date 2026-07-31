<script lang="ts">
	import faviconApple from '$lib/assets/favicon/apple-touch-icon.png';
	import faviconThirtyTwo from '$lib/assets/favicon/favicon-32x32.png';
	import faviconSixteen from '$lib/assets/favicon/favicon-16x16.png';
	import webManifest from '$lib/assets/favicon/site.webmanifest';

	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href={faviconApple} />
	<link rel="icon" type="image/png" sizes="32x32" href={faviconThirtyTwo} />
	<link rel="icon" type="image/png" sizes="16x16" href={faviconSixteen} />
	<link rel="manifest" href={webManifest} />
</svelte:head>

<Nav />
{@render children()}

<style>
	@import '@/globals.css';
</style>
