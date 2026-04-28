<script lang="ts">
	interface Props {
		copy: string;
		textBefore: string;
		textAfter: string;
	}

	import { handleButtonRoomCopy } from '$lib/utils/userActions';

	let { copy, textBefore, textAfter }: Props = $props();

	let buttonEl: HTMLButtonElement;
</script>

<button
	bind:this={buttonEl}
	onclick={() => handleButtonRoomCopy(buttonEl, copy, textAfter, textBefore)}>{textBefore}</button
>

<style>
	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}

	@media screen and (max-width: 768px) {
		button {
			padding: 0.25rem 0.5rem;
		}
	}
</style>
