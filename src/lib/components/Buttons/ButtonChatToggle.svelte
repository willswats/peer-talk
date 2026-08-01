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
		<span class="svg-container--small">
			<SvgChatOffLine />
		</span>
	{:else}
		<span class="svg-container--small">
			<SvgChatLine />
		</span>
	{/if}
</Button>
