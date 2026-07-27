<script>
	import ChatLine from '$lib/components/svg/ChatLine.svelte';
	import ChatOffLine from '$lib/components/svg/ChatOffLine.svelte';
	import { Button } from '$lib/components/Buttons';

	import { userState } from '$lib/state.svelte';
</script>

<Button
	onclick={() => (userState.chatToggled = !userState.chatToggled)}
	--btn-border="var(--border)"
>
	{#if userState.chatToggled}
		<ChatOffLine width={24} height={24} />
	{:else}
		<ChatLine width={24} height={24} />
	{/if}
</Button>
