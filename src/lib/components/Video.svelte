<script lang="ts">
	interface Props {
		username: string;
		videoStream: MediaStream | null;
		muted: boolean;
	}

	import { slide } from 'svelte/transition';
	import { SvgVolumeUpLine } from '$lib/components/svg';

	let { username, videoStream, muted }: Props = $props();

	let videoElement: HTMLVideoElement;
	let hasVideo = $state(false);
	let displayVolume = $state(false);
	let volume = $state(100);

	$effect(() => {
		if (videoStream) {
			videoElement.srcObject = videoStream;
			hasVideo = videoStream.getVideoTracks().length > 0;
		}
	});

	function handleVolumeChange() {
		if (videoElement) {
			videoElement.volume = volume / 100;
		}
	}
</script>

<div class:hidden={!hasVideo} id="video-container">
	<video bind:this={videoElement} autoplay playsinline controls={false} {muted}>
		<track kind="captions" />
	</video>
	{#if !muted}
		<div id="button-container">
			<button
				onclick={() => {
					displayVolume = !displayVolume;
				}}><SvgVolumeUpLine width={24} height={24} /></button
			>
		</div>
		{#if displayVolume}
			<div id="input-container" transition:slide={{ duration: 300, axis: 'y' }}>
				<input
					min="0"
					max="100"
					step="1"
					type="range"
					bind:value={volume}
					oninput={handleVolumeChange}
				/>
			</div>
		{/if}
	{/if}
</div>
{#if !hasVideo}
	<div id="video-container">
		<span>{username}</span>
		{#if muted}
			<div id="button-container">
				<SvgVolumeUpLine width={24} height={24} />
			</div>
		{:else}
			<div id="input-container">
				<input
					min="0"
					max="100"
					step="1"
					type="range"
					bind:value={volume}
					oninput={handleVolumeChange}
				/>
			</div>
		{/if}
	</div>
{/if}

<style>
	video {
		width: 100%;
		height: 100%;
	}

	#video-container {
		width: 100%;
		height: 100%;
		background-color: var(--background-color, var(--bg-secondary));
		border-radius: var(--border-radius-normal);
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--border);
		position: relative;
	}

	span {
		font-size: 2rem;
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-large);
		padding: 1rem;
		overflow: hidden;
		border: 1px solid var(--border);
	}

	button {
		padding: 1rem;
	}

	input {
		padding: 0;
	}

	#input-container {
		display: flex;
		background-color: transparent;
		border: none;
	}

	#button-container {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	@media screen and (max-width: 768px) {
		span {
			font-size: 1rem;
		}
	}
</style>
