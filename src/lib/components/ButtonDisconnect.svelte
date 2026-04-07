<script lang="ts">
	import HangUp from '$lib/components/svg/HangUp.svelte';
	import { disconnectUser } from '$lib/utils/disconnectUser';
</script>

<button onclick={disconnectUser}><HangUp width={24} height={24} /></button>

<style>
	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal);
		padding: 0.5rem 1rem;
	}

	@media screen and (max-width: 768px) {
		button {
			padding: 0.5rem;
		}
	}
</style>
