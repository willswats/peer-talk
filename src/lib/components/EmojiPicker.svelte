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
		margin-bottom: 4rem;
		margin-right: 1rem;
		z-index: 1000;
		width: 20rem;
		height: 25rem;
	}

	:global(emoji-picker) {
		width: 100%;
		height: 100%;
		--background: var(--bg-secondary);
		--border-color: var(--border);
		--category-font-color: var(--text);
		--input-font-color: var(--text);
		--input-border-color: var(--border);
	}

	@media screen and (max-width: 768px) {
		.emoji-picker-container {
			width: 18rem;
			height: 25rem;
		}
	}
</style>
