<script lang="ts">
	import { onMount } from 'svelte';
	import type { Socket } from 'socket.io-client';

	interface Props {
		socket: Socket;
	}

	let { socket }: Props = $props();

	let messageContainer: HTMLParagraphElement | null = null;
	let messageInput: HTMLInputElement | null = null;

	function getTime() {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function appendMessage(text: string, type: string) {
		if (messageContainer === null) return;

		const messageElement = document.createElement('p');
		messageElement.classList.add(type); // 'sent' or 'received'
		messageElement.innerText = text;
		messageContainer.appendChild(messageElement);
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

<section id="chat-container">
	<p bind:this={messageContainer} id="message-container"></p>
	<form onsubmit={handleMessageSubmit} id="send-container">
		<input bind:this={messageInput} id="message-input" />
	</form>
</section>

<style>
	#chat-container {
		display: flex;
		flex-direction: column;
		background-color: #2a2a2a;
		border-radius: 25px;
		padding: 2rem;
		height: 20rem;
	}

	#message-container {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		font-size: 1.2rem;
		overflow-y: scroll;
	}

	#message-input {
		color: #fff;
		background-color: #3a3a3a;
		font-size: 1.2rem;
		padding: 0.5rem;
		width: 100%;
	}
</style>
