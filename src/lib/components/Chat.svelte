<script lang="ts">
	import { peerState } from '$lib/state.svelte';

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

<style>
	#chat {
		display: flex;
		flex-direction: column;
		background-color: var(--mantle);
		border-radius: var(--border-radius-normal);
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
</style>
