<script>
	import { SvgChatLine, SvgChatOffLine } from '$lib/components/svg';
	import { Button } from '$lib/components/Buttons';

	import { userState } from '$lib/state.svelte';
</script>

<Button
	onclick={() => (userState.chatToggled = !userState.chatToggled)}
	--btn-border="var(--border)"
>
	{#if userState.chatToggled}
		<SvgChatOffLine width={24} height={24} />
	{:else}
		<SvgChatLine width={24} height={24} />
	{/if}
</Button>
