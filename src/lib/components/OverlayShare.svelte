<script lang="ts">
	interface Props {
		shareShown: boolean;
	}

	import { Button } from '$lib/components/Buttons';

	let { shareShown = $bindable() }: Props = $props();
</script>

{#if shareShown}
	<div id="overlay"></div>
	<form id="share">
		<div id="share-content">
			<Button onclick={() => (shareShown = false)}>Close</Button>
			<p>Invite Others</p>
			<div id="share-content-bottom">
				<input value={window.location.href} />
				<!-- <Button onclick={() => navigator.clipboard.writeText(window.location.href)}>Copy</Button> -->
			</div>
		</div>
	</form>
{/if}

<style>
	#overlay {
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

	#share {
		position: fixed;
		z-index: 2;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 25rem;
	}

	#share-content {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-tertiary);
		width: 100%;
		overflow: hidden;
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
	}

	#share-content p {
		font-size: 1.4rem;
		padding: 1rem;
	}

	#share-content-bottom {
		display: flex;
		background-color: var(--bg-secondary);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		gap: 0.5rem;
	}

	@media screen and (max-width: 768px) {
		#share {
			width: 16rem;
		}

		#share-content p {
			font-size: 1rem;
		}
	}
</style>
