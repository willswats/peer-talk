<script lang="ts">
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import EmoticonLine from '$lib/components/svg/EmoticonLine.svelte';

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
			peerState.messages.unshift(`${userState.username} (${getTime()}): ${message}`);

			// Send the message to the server
			peerState.socket.emit('send-chat-message', message);

			// Clear the input box
			messageInput.value = '';
		}
	}

	function addEmojiToInput(emojiChar: string) {
		if (messageInput === null) return;

		messageInput.value += emojiChar;
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

{#if userState.chatToggled}
	<section id="chat">
		<div id="chat__message-container">
			{#each peerState.messages as message, index (index + message)}
				<p>{message}</p>
			{/each}
		</div>
		<div id="chat__message-input-container">
			<form onsubmit={handleMessageSubmit}>
				<input placeholder="Send message..." bind:this={messageInput} id="chat__message-input" />
				<button
					type="button"
					id="chat__btn-show-emoji"
					bind:this={emojiButton}
					onclick={() => (showEmojiPicker = !showEmojiPicker)}
				>
					<EmoticonLine width={24} height={24} />
				</button>
			</form>
		</div>
		{#if showEmojiPicker}
			<div bind:this={emojiPickerWrapper} class="chat__emoji-picker-wrapper">
				<EmojiPicker onEmojiSelect={addEmojiToInput} />
			</div>
		{/if}
	</section>
{/if}

<style>
	#chat {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-secondary);
		border-radius: var(--border-radius-normal);
		padding: 1rem;
		height: 100%;
		max-width: 25rem;
		border: 1px solid var(--border);
	}

	#chat__message-container {
		display: flex;
		flex-direction: column-reverse;
		font-size: 1.2rem;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-wrap: break-word;
	}

	#chat__message-input-container {
		display: flex;
		gap: 0.5rem;
	}

	#chat__message-input-container form {
		display: flex;
		flex: 1;
		position: relative;
	}

	#chat__message-input {
		width: 100%;
		color: var(--text);
		background-color: var(--bg-tertiary);
		border-radius: var(--border-radius-normal);
		font-size: 1.2rem;
		padding: 0.5rem;
		padding-right: 50px;
		border: 1px solid var(--border);
	}

	.chat__emoji-picker-wrapper {
		position: relative;
	}

	#chat__btn-show-emoji {
		background-color: transparent;
		border-radius: var(--border-radius-normal);
		position: absolute;
		bottom: 0;
		right: 0;
	}
	@media screen and (max-width: 768px) {
		#chat {
			position: absolute;
			right: 0;
			background-color: var(--bg-tertiary-opaque);
		}
	}
</style>
