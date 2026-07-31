<script lang="ts">
	interface Props {
		copy: string;
		textBefore: string;
		textAfter: string;
	}

	export function handleButtonRoomCopy(
		buttonEl: HTMLButtonElement,
		copy: string,
		textAfter: string,
		textBefore: string
	) {
		navigator.clipboard.writeText(copy);
		buttonEl.innerText = textAfter;
		setTimeout(() => {
			buttonEl.innerText = textBefore;
		}, 5000);
	}

	let { copy, textBefore, textAfter }: Props = $props();

	let buttonEl: HTMLButtonElement;
</script>

<button
	bind:this={buttonEl}
	onclick={() => handleButtonRoomCopy(buttonEl, copy, textAfter, textBefore)}>{textBefore}</button
>

<style>
	button {
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
		white-space: pre;
	}

	@media screen and (max-width: 768px) {
		button {
			padding: 0.25rem 0.5rem;
		}
	}
</style>
