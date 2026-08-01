<script lang="ts">
	import { blur } from 'svelte/transition';
	import { SvgVolumeUpLine } from '$lib/components/svg';

	interface Props {
		videoElement: HTMLVideoElement | null;
	}

	let { videoElement }: Props = $props();

	let displayVolume = $state(false);
	let volume = $state(100);

	function handleVolumeChange() {
		if (videoElement) {
			videoElement.volume = volume / 100;
		}
	}
</script>

<div id="video-volume">
	<button
		onclick={() => {
			displayVolume = !displayVolume;
		}}><SvgVolumeUpLine width={24} height={24} /></button
	>
	{#if displayVolume}
		<input
			transition:blur={{ duration: 300 }}
			min="0"
			max="100"
			step="10"
			type="range"
			bind:value={volume}
			oninput={handleVolumeChange}
		/>
	{/if}
</div>

<style>
	#video-volume {
		display: flex;
		align-items: center;
		position: absolute;
		left: 0.5rem;
		bottom: 0.5rem;
	}

	button {
		display: flex;
		padding: 0.5rem;
		background-color: var(--bg-tertiary-opaque);
		color: var(--text);
		border-radius: var(--border-radius-normal);
		margin-right: 0.25rem;
	}

	input[type='range'] {
		display: flex;
		background-color: var(--bg-tertiary-opaque);
		padding: 0.5rem;
		border-radius: var(--border-radius-normal);
		width: 10rem;
		cursor: pointer;
		appearance: none;
		border: none;
	}

	input[type='range']::-webkit-slider-thumb {
		height: 1rem;
		width: 1rem;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		color: var(--blue);
		background-color: var(--blue);
		border-radius: var(--border-radius-large);
	}

	input[type='range']::-moz-range-thumb {
		height: 1rem;
		width: 1rem;
		cursor: pointer;
		border: none;
		color: var(--blue);
		background-color: var(--blue);
		border-radius: var(--border-radius-large);
	}

	input[type='range']::-webkit-slider-runnable-track {
		background: var(--text);
		height: 0.5rem;
		border-radius: var(--border-radius-normal);
	}

	input[type='range']::-moz-range-track {
		background: var(--text);
		height: 0.5rem;
		border-radius: var(--border-radius-normal);
	}
</style>
