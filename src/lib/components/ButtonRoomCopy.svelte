<script lang="ts">
	interface Props {
		copy: string;
		textBefore: string;
		textAfter: string;
	}

	let { copy, textBefore, textAfter }: Props = $props();

	let buttonEl: HTMLButtonElement;

	function handleButtonRoomCopy() {
		navigator.clipboard.writeText(copy);
		buttonEl.innerText = textAfter;
		setTimeout(() => {
			buttonEl.innerText = textBefore;
		}, 5000);
	}
</script>

<button bind:this={buttonEl} onclick={() => handleButtonRoomCopy()}>{textBefore}</button>

<style>
	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}
</style>
