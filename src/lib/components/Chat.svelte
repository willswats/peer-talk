<script lang="ts">
	import { onMount } from 'svelte';
	import { peerState } from '$lib/state.svelte';

	let messageContainer: HTMLOListElement | null = null;
	let messageInput: HTMLInputElement | null = null;

	function getTime() {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function appendMessage(text: string, type: string) {
		if (messageContainer === null) return;

		const messageElement = document.createElement('li');
		messageElement.classList.add(type); // 'sent' or 'received'
		messageElement.innerText = text;
		// TODO: dont manip dom directly
		messageContainer.insertBefore(messageElement, messageContainer.firstChild);
	}

	function handleMessageSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (messageInput === null) return;

		const message = messageInput!.value;

		// Show the message in your chat window
		appendMessage(`You (${getTime()}): ${message}`, 'sent');

		// Send the message to the server
		peerState.socket.emit('send-chat-message', message);

		// Clear the input box
		messageInput.value = '';
	}

	onMount(() => {
		peerState.socket.on('chat-message', (data) => {
			appendMessage(`${data.name} (${data.time}): ${data.message}`, 'received');
		});
	});
</script>

<section id="chat">
	<ol bind:this={messageContainer} id="chat__message-container"></ol>
	<form onsubmit={handleMessageSubmit}>
		<input bind:this={messageInput} id="chat__message-input" />
	</form>
</section>

<style>
	#chat {
		display: flex;
		flex-direction: column;
		background-color: #3a3a3a;
		border: 1px solid #4a4a4a;
		border-radius: 25px;
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
		color: #fff;
		background-color: #4a4a4a;
		font-size: 1.2rem;
		padding: 0.5rem;
		width: 100%;
	}
</style>
