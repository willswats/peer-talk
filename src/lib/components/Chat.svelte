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

		const message = messageTextArea!.value;

		if (message.length > 0) {
			// Show the message in your chat window
			peerState.messages.unshift(`${userState.username} (${getTime()}): ${message}`);

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
			{#each peerState.messages as message, index (index + message)}
				<p>{message}</p>
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
					<SvgEmoticonLine width={24} height={24} />
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
		font-size: 1.2rem;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-wrap: break-word;
	}

	#chat__message-container p {
		padding: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	#chat__message-input-container {
		display: flex;
		gap: 0.5rem;
		margin: 1rem;
	}

	#chat__message-input-container textarea {
		field-sizing: content;
		padding-right: 50px;
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
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media screen and (max-width: 1200px) {
		#chat {
			width: 20rem;
			position: absolute;
			right: 0;
			background-color: var(--bg-tertiary-opaque);
		}

		#chat__message-input-container textarea {
			padding-right: 40px;
		}
	}
</style>
