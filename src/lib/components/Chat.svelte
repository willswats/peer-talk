<script lang="ts">
	import ChatLine from '$lib/components/svg/ChatLine.svelte';
	import ChatOffLine from '$lib/components/svg/ChatOffLine.svelte';
	import { userState, peerState } from '$lib/state.svelte';

	let messageInput: HTMLInputElement | null = null;

	function getTime() {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function handleMessageSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (messageInput === null) return;

		const message = messageInput!.value;

		if (message.length > 0) {
			// Show the message in your chat window
			peerState.messages.unshift(`You (${getTime()}): ${message}`);

			// Send the message to the server
			peerState.socket.emit('send-chat-message', message);

			// Clear the input box
			messageInput.value = '';
		}
	}
</script>

<button onclick={() => (userState.chatToggled = !userState.chatToggled)}>
	{#if userState.chatToggled}
		<ChatOffLine width={24} height={24} />
	{:else}
		<ChatLine width={24} height={24} />
	{/if}
</button>
{#if userState.chatToggled}
	<section id="chat">
		<ol id="chat__message-container">
			{#each peerState.messages as message, index (index + message)}
				<li>{message}</li>
			{/each}
		</ol>
		<form onsubmit={handleMessageSubmit}>
			<input bind:this={messageInput} id="chat__message-input" />
		</form>
	</section>
{/if}

<style>
	#chat {
		display: flex;
		flex-direction: column;
		background-color: var(--mantle);
		border-radius: 0 0 var(--border-radius-normal) var(--border-radius-normal);
		padding: 2rem;
		height: 20rem;
	}

	#chat__message-container {
		display: flex;
		flex-direction: column-reverse;
		font-size: 1.2rem;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	#chat__message-input {
		color: var(--text);
		background-color: var(--crust);
		font-size: 1.2rem;
		padding: 0.5rem;
		width: 100%;
	}

	button {
		background-color: var(--crust);
		border-radius: var(--border-radius-normal) var(--border-radius-normal) 0 0;
		padding: 0.5rem;
	}
</style>
