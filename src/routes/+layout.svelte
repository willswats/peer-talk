<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />
{@render children()}

<style>
	:root {
		--rosewater: #f5e0dc;
		--flamingo: #f2cdcd;
		--pink: #f5c2e7;
		--mauve: #cba6f7;
		--red: #f38ba8;
		--maroon: #eba0ac;
		--peach: #fab387;
		--yellow: #f9e2af;
		--green: #a6e3a1;
		--teal: #94e2d5;
		--sky: #89dceb;
		--sapphire: #74c7ec;
		--blue: #89b4fa;
		--lavender: #b4befe;
		--text: #cdd6f4;
		--subtext1: #bac2de;
		--subtext0: #a6adc8;
		--overlay2: #9399b2;
		--overlay1: #7f849c;
		--overlay0: #6c7086;
		--surface2: #585b70;
		--surface1: #45475a;
		--surface0: #313244;
		--base: #1e1e2e;
		--mantle: #181825;
		--crust: #11111b;

		--border-radius-normal: 6px;
		--border-radius-large: 12px;
	}

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
			color: var(--text);
			background-color: var(--base);
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

		.hidden {
			position: fixed;
			top: 0;
			left: 0;
			width: 1px;
			height: 1px;
			opacity: 0;
			pointer-events: none;
			z-index: -1;
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
