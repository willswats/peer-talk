<script lang="ts">
	import { marketplaceApps, userState } from '$lib/state.svelte';
	import { fade } from 'svelte/transition';

	import App from '$lib/components/App.svelte';
	import AppLaunch from '$lib/components/AppLaunch.svelte';
	import { SvgCloseX } from '$lib/components/svg';

	interface Props {
		appsShown: boolean;
	}

	let { appsShown = $bindable() }: Props = $props();
</script>

{#if appsShown}
	<button
		transition:fade={{ duration: 300 }}
		aria-label="overlay"
		id="overlay"
		onclick={() => (appsShown = false)}
	></button>
{/if}
<section class:hidden={!appsShown} id="apps-picker">
	<div id="apps-picker__content">
		<button id="apps-picker__content-close-btn" onclick={() => (appsShown = false)}>
			<span class="svg-container--small">
				<SvgCloseX />
			</span>
		</button>
		<div id="apps-picker__content-top">
			<h1>
				{#if !userState.appLaunched}
					Apps
				{:else}
					{#each marketplaceApps as marketplaceApp (marketplaceApp.id)}
						{#if marketplaceApp.render}
							{marketplaceApp.title}
						{/if}
					{/each}
				{/if}
			</h1>
		</div>
		{#if !userState.appLaunched}
			<div id="apps-picker__launch-cards">
				{#each marketplaceApps as marketplaceApp (marketplaceApp.id)}
					<AppLaunch {marketplaceApp} {marketplaceApps} />
				{/each}
			</div>
		{:else}
			<div id="apps-picker__app-cards">
				{#each marketplaceApps as marketplaceApp (marketplaceApp.id)}
					{#if marketplaceApp.render}
						<App {marketplaceApp} {marketplaceApps} roomId={userState.roomId} />
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	#overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 1;
	}

	#apps-picker {
		position: fixed;
		z-index: 2;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	#apps-picker__content {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
	}

	#apps-picker__content-top {
		padding: 0.5rem;
	}

	#apps-picker__content-top h1 {
		font-size: 1.4rem;
	}

	#apps-picker__content-close-btn {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.25rem;
	}

	#apps-picker__launch-cards {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-secondary);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		gap: 0.5rem;
		width: 80vw;
		height: 80vh;
	}

	#apps-picker__app-cards {
		display: flex;
		flex-direction: column;
		width: 80vw;
		height: 80vh;
	}

	@media screen and (max-width: 768px) {
		#apps-picker__launch-cards {
			grid-template-columns: 1fr;
		}
	}
</style>
