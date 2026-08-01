import { Picker } from 'emoji-picker-element';
import type { EmojiClickEvent } from 'emoji-picker-element/shared';

let picker: Picker | null = null;

export function emojiPicker(element: HTMLElement, onEmojiSelect: (emoji: string) => void) {
	async function initPicker() {
		const { Picker } = await import('emoji-picker-element');

		picker = new Picker({
			locale: 'en'
		});

		picker.addEventListener('emoji-click', (event: EmojiClickEvent) => {
			if (event.detail.unicode) {
				onEmojiSelect(event.detail.unicode);
			}
		});

		element.appendChild(picker);
	}

	initPicker();

	return {
		destroy() {
			if (picker) {
				picker.remove();
				picker = null;
			}
		}
	};
}
