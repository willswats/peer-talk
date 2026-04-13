<script lang="ts">
	import ButtonRoomCopy from '$lib/components/ButtonRoomCopy.svelte';

	interface Props {
		roomToggle: boolean;
		roomId: string | undefined;
	}
	let { roomToggle = $bindable(), roomId }: Props = $props();
</script>

<div id="room__top-buttons">
	<div id="room__top-buttons-left">
		<button class="btn-blue" onclick={() => (roomToggle = false)}>Talk</button>
		<button class="btn-mauve" onclick={() => (roomToggle = true)}>Apps</button>
	</div>
	<div id="room__top-buttons-right">
		<ButtonRoomCopy copy={roomId || ''} textBefore={'Copy Room ID'} textAfter={'Copied Room ID'} />
		<ButtonRoomCopy
			copy={window.location.href}
			textBefore={'Copy Room Link'}
			textAfter={'Copied Room Link'}
		/>
	</div>
</div>

<style>
	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}

	#room__top-buttons {
		display: flex;
		margin-bottom: 0.5rem;
	}

	#room__top-buttons-left {
		display: flex;
		flex-grow: 1;
		justify-content: flex-start;
		gap: 0.25rem;
	}

	#room__top-buttons-right {
		display: flex;
		flex-grow: 1;
		justify-content: flex-end;
		gap: 0.25rem;
	}
</style>
