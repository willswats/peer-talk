<script lang="ts">
	import { onMount } from 'svelte';

	interface EmojiPicker {
		onEmojiSelect: (emoji: string) => void;
	}

	let { onEmojiSelect }: EmojiPicker = $props();

	let emojiPickerContainer: HTMLDivElement;
	let picker: any = $state(null);

	onMount(async () => {
		const { Picker } = await import('emoji-picker-element');

		picker = new Picker({
			locale: 'en'
		});

		if (emojiPickerContainer) {
			emojiPickerContainer.appendChild(picker);
		}

		picker.addEventListener('emoji-click', (event: any) => {
			onEmojiSelect(event.detail.unicode);
		});
	});

	$effect(() => {
		return () => {
			if (picker) {
				picker.remove();
				picker = null;
			}
		};
	});
</script>

<div bind:this={emojiPickerContainer} class="emoji-picker-container"></div>

<style>
	.emoji-picker-container {
		position: absolute;
		bottom: 100%;
		right: 0;
		margin-bottom: 3.5rem;
		margin-right: 1rem;
		z-index: 1000;
		width: 22rem;
		height: 25rem;
	}

	:global(emoji-picker) {
		scrollbar-color: var(--text) var(--bg-secondary-opaque);
		width: 100%;
		height: 100%;
		--background: var(--bg-secondary-opaque);
		--border-color: var(--border);
		--category-font-color: var(--text);
		--input-font-color: var(--text);
		--input-border-color: var(--border);
		--border-radius: var(--border-radius-large);
		--outline-color: var(--blue);
		--num-columns: 8;
	}

	@media screen and (max-width: 1200px) {
		:global(emoji-picker) {
			scrollbar-color: var(--text) var(--bg-tertiary-opaque);
			--background: var(--bg-tertiary-opaque);
		}
	}

	@media screen and (max-width: 768px) {
		:global(emoji-picker) {
			--emoji-size: 1rem;
		}

		.emoji-picker-container {
			width: 18rem;
			height: 25rem;
		}
	}
</style>
