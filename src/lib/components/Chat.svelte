<script lang="ts">
	import { slide } from 'svelte/transition';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import { SvgEmoticonLine } from '$lib/components/svg';

	import { userState, peerState } from '$lib/state.svelte';

	let messageTextArea: HTMLTextAreaElement | null = $state(null);
	let messageForm: HTMLFormElement | null = $state(null);
	let showEmojiPicker = $state(false);
	let emojiButton: HTMLButtonElement | null = $state(null);
	let emojiPickerWrapper: HTMLDivElement | null = $state(null);

	function getTime() {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function handleTextAreaKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			if (messageForm) {
				messageForm.requestSubmit();
			}
		}
	}

	function handleMessageSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (messageTextArea === null) return;

		const message = messageTextArea.value;

		if (message.length > 0) {
			// Show the message in your chat window
			peerState.messages.unshift({ name: userState.username, time: getTime(), message });

			// Send the message to the server
			peerState.socket.emit('send-chat-message', message);

			// Clear the input box
			messageTextArea.value = '';
		}
	}

	function addEmojiToInput(emojiChar: string) {
		if (messageTextArea === null) return;

		messageTextArea.value += emojiChar;
		showEmojiPicker = false;
		messageTextArea.focus();
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
	<section id="chat" transition:slide={{ duration: 300, axis: 'x' }}>
		<div id="chat__message-container">
			{#each peerState.messages as message, index (index)}
				<div id="chat__message-content">
					<p id="chat__message-title">
						{message.name} <span id="chat__message-time">({message.time})</span>
					</p>
					<p>{message.message}</p>
				</div>
			{/each}
		</div>
		<div id="chat__message-input-container">
			<form onsubmit={handleMessageSubmit} bind:this={messageForm}>
				<textarea
					onkeydown={handleTextAreaKeyDown}
					placeholder="Send message..."
					rows="1"
					bind:this={messageTextArea}
				></textarea>
				<button
					type="button"
					id="chat__btn-show-emoji"
					bind:this={emojiButton}
					onclick={() => (showEmojiPicker = !showEmojiPicker)}
				>
					<span class="svg-container--small">
						<SvgEmoticonLine />
					</span>
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
		background-color: var(--bg-secondary);
		scrollbar-color: var(--text) var(--bg-secondary);
		display: flex;
		flex-direction: column;
		border-radius: 0 var(--border-radius-normal) var(--border-radius-normal) 0;
		height: 100%;
		width: 25rem;
		border: 1px solid var(--border);
		margin-left: 0.5rem;
	}

	#chat__message-container {
		display: flex;
		flex-direction: column-reverse;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-wrap: break-word;
	}

	#chat__message-content {
		padding: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	#chat__message-title {
		font-weight: bold;
		font-size: 1.2rem;
	}

	#chat__message-time {
		font-weight: normal;
		font-size: 1rem;
	}

	#chat__message-input-container {
		display: flex;
		gap: 0.5rem;
		margin: 1rem;
	}

	#chat__message-input-container textarea {
		field-sizing: content;
		padding-right: 50px;
		max-height: 10rem;
		word-break: break-all;
	}

	#chat__message-input-container form {
		display: flex;
		flex: 1;
		position: relative;
	}

	.chat__emoji-picker-wrapper {
		position: relative;
	}

	#chat__btn-show-emoji {
		background-color: transparent;
		border-radius: var(--border-radius-normal);
		position: absolute;
		right: 1rem;
		bottom: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media screen and (max-width: 1200px) {
		#chat {
			position: absolute;
			right: 0;
			background-color: var(--bg-tertiary-opaque);
			scrollbar-color: var(--text) var(--bg-tertiary);
		}
	}

	@media screen and (max-width: 768px) {
		#chat {
			width: 18rem;
		}
	}
</style>
