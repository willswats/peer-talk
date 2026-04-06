<script lang="ts">
	import { onMount } from 'svelte';

	interface EmojiPicker {
		onEmojiSelect: (emoji: string) => void;
	}

	let { onEmojiSelect }: EmojiPicker = $props();

	let emojiPickerContainer: HTMLDivElement;

	onMount(async () => {
		const { Picker } = await import('emoji-picker-element');

		let picker = new Picker({
			locale: 'en'
		});

		emojiPickerContainer.appendChild(picker);

		picker.addEventListener('emoji-click', (event: any) => {
			onEmojiSelect(event.detail.unicode);
		});
	});
</script>

<div bind:this={emojiPickerContainer} class="emoji-picker-container"></div>

<style>
	.emoji-picker-container {
		position: absolute;
		bottom: 100%;
		right: 0;
		margin-bottom: 0.5rem;
		z-index: 1000;
	}

	:global(emoji-picker) {
		--background: var(--mantle);
		--border-color: var(--surface0);
		--category-font-color: var(--text);
		--input-font-color: var(--text);
		--input-border-color: var(--surface0);
	}
</style>
