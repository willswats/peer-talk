<script lang="ts">
	interface Props {
		children: Snippet;
		confirmFunction: () => void;
		showCancelButton?: boolean;
		alertShown: boolean;
	}

	import { Button } from '$lib/components/Buttons';
	import type { Snippet } from 'svelte';

	let {
		children,
		confirmFunction,
		showCancelButton = true,
		alertShown = $bindable()
	}: Props = $props();

	function confirmHandler() {
		confirmFunction();
	}

	function cancelHandeler() {
		alertShown = false;
	}
</script>

{#if alertShown}
	<div id="alert-overlay"></div>
	<form id="alert">
		<div id="alert-content">
			<p>
				{@render children()}
			</p>
			<div id="alert-content-buttons">
				<Button
					--btn-bg-colour="var(--bg-tertiary)"
					--btn-bg-hover="var(--bg-tertiary)"
					--btn-border="var(--border)"
					onclick={confirmHandler}>Ok</Button
				>
				{#if showCancelButton}
					<Button
						--btn-bg-colour="var(--bg-tertiary)"
						--btn-bg-hover="var(--bg-tertiary)"
						--btn-border="var(--border)"
						onclick={cancelHandeler}>Cancel</Button
					>
				{/if}
			</div>
		</div>
	</form>
{/if}

<style>
	#alert-overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 1;
	}

	#alert {
		position: fixed;
		z-index: 2;
		top: 50%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		width: 20rem;
	}

	#alert-content {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-tertiary);
		width: 100%;
		overflow: hidden;
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
	}

	#alert-content p {
		font-size: 1.4rem;
		padding: 1rem;
	}

	#alert-content-buttons {
		display: flex;
		justify-content: flex-end;
		background-color: var(--bg-secondary);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		gap: 0.5rem;
	}

	@media screen and (max-width: 768px) {
		#alert {
			width: 18rem;
		}

		#alert-content p {
			font-size: 1.2rem;
		}
	}
</style>
