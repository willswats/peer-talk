<script lang="ts">
	interface Props {
		copy: string;
		textBefore: string;
		textAfter: string;
	}

	import { handleButtonRoomCopy } from '$lib/utils/userActions';
	import './buttons.css';

	let { copy, textBefore, textAfter }: Props = $props();

	let buttonEl: HTMLButtonElement;
</script>

<button
	bind:this={buttonEl}
	onclick={() => handleButtonRoomCopy(buttonEl, copy, textAfter, textBefore)}>{textBefore}</button
>
