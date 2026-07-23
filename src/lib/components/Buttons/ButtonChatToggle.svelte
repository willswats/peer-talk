<script>
	import ChatLine from '$lib/components/svg/ChatLine.svelte';
	import ChatOffLine from '$lib/components/svg/ChatOffLine.svelte';

	import { userState } from '$lib/state.svelte';

	import './buttons.css';
</script>

<button id="btn-chat-toggle" onclick={() => (userState.chatToggled = !userState.chatToggled)}>
	{#if userState.chatToggled}
		<ChatOffLine width={24} height={24} />
	{:else}
		<ChatLine width={24} height={24} />
	{/if}
</button>

<style>
	#btn-chat-toggle {
		border: 1px solid var(--border);
	}
</style>
