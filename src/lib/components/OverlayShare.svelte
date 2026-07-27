<script lang="ts">
	interface Props {
		shareShown: boolean;
	}

	import { Button } from '$lib/components/Buttons';
	import CloseX from '$lib/components/svg/CloseX.svelte';

	let { shareShown = $bindable() }: Props = $props();
</script>

{#if shareShown}
	<div id="overlay"></div>
	<section id="share">
		<div id="share__content">
			<button id="share__content-close-btn" onclick={() => (shareShown = false)}
				><CloseX width={24} height={24} /></button
			>
			<div id="share__content-top">
				<h1>Invite Others</h1>
				<p>Send them the room link to invite them to the room</p>
			</div>
			<div id="share__content-bottom">
				<input readonly value={window.location.href} />
				<Button onclick={() => navigator.clipboard.writeText(window.location.href)}>Copy</Button>
			</div>
		</div>
	</section>
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

	#share__content {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-tertiary);
		width: 100%;
		overflow: hidden;
		border-radius: var(--border-radius-normal);
		border: 1px solid var(--border);
	}

	#share__content-top {
		padding: 0.5rem;
	}

	#share__content-top h1 {
		font-size: 1.4rem;
		text-decoration: underline;
	}

	#share__content-top p {
		font-size: 1rem;
	}

	#share__content-close-btn {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.25rem;
	}

	#share__content-bottom {
		display: flex;
		background-color: var(--bg-secondary);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		gap: 0.5rem;
	}

	#share__content-bottom input {
		font-size: 1rem;
	}

	@media screen and (max-width: 768px) {
		#share {
			width: 16rem;
		}

		#share__content p {
			font-size: 1rem;
		}
	}
</style>
