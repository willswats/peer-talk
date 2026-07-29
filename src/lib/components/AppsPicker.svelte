<script lang="ts">
	import { embeddedApps, userState } from '$lib/state.svelte';

	import AppCard from '$lib/components/AppCard.svelte';
	import AppLaunchCard from '$lib/components/AppLaunchCard.svelte';
	import CloseX from '$lib/components/svg/CloseX.svelte';

	interface Props {
		appsShown: boolean;
	}

	let { appsShown = $bindable() }: Props = $props();
</script>

{#if appsShown}
	<button aria-label="overlay" id="overlay" onclick={() => (appsShown = false)}></button>
	<section id="apps-picker">
		<div id="apps-picker__content">
			<button id="apps-picker__content-close-btn" onclick={() => (appsShown = false)}
				><CloseX width={24} height={24} /></button
			>
			<div id="apps-picker__content-top">
				<h1>
					{#if !userState.appLaunched}
						Apps
					{:else}
						{#each embeddedApps as embeddedApp (embeddedApp.id)}
							{#if embeddedApp.render}
								{embeddedApp.title}
							{/if}
						{/each}
					{/if}
				</h1>
			</div>
			{#if !userState.appLaunched}
				<div id="apps-picker__launch-cards">
					{#each embeddedApps as embeddedApp (embeddedApp.id)}
						<AppLaunchCard {embeddedApp} {embeddedApps} />
					{/each}
				</div>
			{:else}
				<div id="apps-picker__app-cards">
					{#each embeddedApps as embeddedApp (embeddedApp.id)}
						{#if embeddedApp.render}
							<AppCard {embeddedApp} {embeddedApps} roomId={userState.roomId} />
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</section>
{/if}

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
		overflow: scroll;
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
