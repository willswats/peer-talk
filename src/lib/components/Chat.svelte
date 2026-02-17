<script lang="ts">
	import { onMount } from 'svelte';
	import type { Socket } from 'socket.io-client';

	interface Props {
		socket: Socket;
	}

	let { socket }: Props = $props();

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
		messageContainer.insertBefore(messageElement, messageContainer.firstChild);
	}

	function handleMessageSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (messageInput === null) return;

		const message = messageInput!.value;

		// Show the message in your chat window
		appendMessage(`You (${getTime()}): ${message}`, 'sent');

		// Send the message to the server
		socket.emit('send-chat-message', message);

		// Clear the input box
		messageInput.value = '';
	}

	onMount(() => {
		socket.on('chat-message', (data) => {
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
