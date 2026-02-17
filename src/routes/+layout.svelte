<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global {
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			font-family: sans-serif;
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		body {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
			color: #fff;
			background-color: #1a1a1a;
		}

		button {
			color: #fff;
			border: none;
			background-color: transparent;
			cursor: pointer;
		}

		input {
			color: #000;
			border: none;
		}

		svg path {
			fill: #fff;
		}

		input[type='number'] {
			appearance: textfield;
			/* Remove Firefox default browser style */
			outline: none;
		}

		/* Remove WebKit default browser style */
		input[type='number']::-webkit-outer-spin-button,
		input[type='number']::-webkit-inner-spin-button {
			appearance: none;
			margin: 0;
		}

		input[type='range'] {
			cursor: pointer;
			appearance: none;
			/* Remove WebKit default browser style */
		}

		input[type='range']::-webkit-slider-thumb {
			cursor: pointer;
			appearance: none;
			/* Remove WebKit default browser style */
			background-color: #fff;
		}

		input[type='range']::-moz-range-thumb {
			cursor: pointer;
			border: none;
			/* Remove Firefox default browser style */
			background-color: #fff;
		}
	}
</style>
