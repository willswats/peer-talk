<script lang="ts">
	interface Props {
		roomToggle: boolean;
	}
	let { roomToggle = $bindable() }: Props = $props();
</script>

<div id="room__top-buttons">
	<button class="btn-blue" onclick={() => (roomToggle = false)}>Talk</button>
	<button class="btn-mauve" onclick={() => (roomToggle = true)}>Apps</button>
</div>

<style>
	button {
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}

	#room__top-buttons {
		display: flex;
		margin-bottom: 0.5rem;
		gap: 0.25rem;
	}

	@media screen and (max-width: 768px) {
		button {
			padding: 0.25rem 0.5rem;
		}
	}
</style>
