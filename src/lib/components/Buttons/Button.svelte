<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Button {
		children: Snippet;
		onclick?: () => void;
	}

	let { children, onclick }: Button = $props();
</script>

<button {onclick}>
	{@render children()}
</button>

<style>
	button {
		background-color: var(--btn-bg-colour, var(--bg-secondary));
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
		height: 100%;
		border: 1px solid var(--btn-border, transparent);
	}

	button:hover {
		background-color: var(--btn-bg-hover, var(--bg-tertiary));
	}

	@media screen and (max-width: 768px) {
		button {
			padding: 0.5rem;
		}
	}
</style>
