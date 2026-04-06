<script lang="ts">
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import ChatLine from '$lib/components/svg/ChatLine.svelte';
	import ChatOffLine from '$lib/components/svg/ChatOffLine.svelte';
	import { userState, peerState } from '$lib/state.svelte';

	let messageInput: HTMLInputElement | null = $state(null);
	let showEmojiPicker = $state(false);
	let emojiButton: HTMLButtonElement | null = $state(null);
	let emojiPickerWrapper: HTMLDivElement | null = $state(null);

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

	function addEmojiToInput(emojiChar: string) {
		if (messageInput === null) return;

		messageInput.value += emojiChar;
		showEmojiPicker = false;
		messageInput.focus();
	}

	function handleClickOutside(event: MouseEvent) {
		if (emojiButton && emojiButton.contains(event.target as Node)) {
			return;
		}

		if (
			showEmojiPicker &&
			emojiPickerWrapper &&
			!emojiPickerWrapper.contains(event.target as Node)
		) {
			showEmojiPicker = false;
		}
	}
</script>

<svelte:document onclick={handleClickOutside} />

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
		<div id="chat__message-input-container">
			<form onsubmit={handleMessageSubmit}>
				<input bind:this={messageInput} id="chat__message-input" />
			</form>
			<button bind:this={emojiButton} onclick={() => (showEmojiPicker = !showEmojiPicker)}
				>Emoji</button
			>
		</div>
	</section>

	{#if showEmojiPicker}
		<div bind:this={emojiPickerWrapper} class="chat__emoji-picker-wrapper">
			<EmojiPicker onEmojiSelect={addEmojiToInput} />
		</div>
	{/if}
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

	#chat__message-input-container {
		display: flex;
		gap: 0.5rem;
	}

	#chat__message-input {
		color: var(--text);
		background-color: var(--crust);
		font-size: 1.2rem;
		padding: 0.5rem;
		width: 100%;
	}

	.chat__emoji-picker-wrapper {
		position: relative;
	}

	button {
		background-color: var(--crust);
		padding: 0.5rem;
	}
</style>
