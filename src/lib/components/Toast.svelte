<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { SvgCloseX } from '$lib/components/svg';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	let showToast = $state(false);
	let showToastTime = 1000;
	let hideToastTime = 10000;

	onMount(() => {
		const showToastTimer = setTimeout(() => {
			showToast = true;

			const hideToastTimer = setTimeout(() => {
				showToast = false;
			}, hideToastTime);
			return () => clearTimeout(hideToastTimer);
		}, showToastTime);

		return () => clearTimeout(showToastTimer);
	});
</script>

{#if showToast}
	<div id="toast" transition:blur={{ duration: 500 }}>
		<div id="toast__content">
			<span id="toast__icon">💡</span>
			<span>{text}</span>
			<button id="toast__close-btn" onclick={() => (showToast = false)}>
				<span class="svg-container--toast">
					<SvgCloseX />
				</span>
			</button>
		</div>
	</div>
{/if}

<style>
	#toast {
		position: absolute;
		top: 3.75rem;
		left: 0.75rem;
		z-index: 999;
		width: 20rem;
	}

	#toast__icon {
		display: flex;
		padding-right: 0.5rem;
	}

	#toast__content {
		position: relative;
		display: flex;
		padding: 0.5rem;
		background-color: var(--bg-tertiary-opaque);
		border: 1px solid var(--border);
		border-radius: var(--border-radius-normal);
	}

	#toast__close-btn {
		display: flex;
	}

	.svg-container--toast {
		display: flex;
		width: 20px;
		height: 20px;
	}

	@media screen and (max-width: 768px) {
		#toast {
			position: absolute;
			width: 16rem;
			padding: 0.25rem;
		}
	}
</style>
