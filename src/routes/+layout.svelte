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
	@font-face {
		font-family: 'Roboto';
		src: url('/fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf');
	}

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
			font-family: Roboto, sans-serif;
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
			color: var(--text);
			border: none;
			background-color: transparent;
			cursor: pointer;
			font-size: 1.2rem;
		}

		input {
			color: #000;
			border: none;
			font-size: 1.2rem;
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

		.btn-peach {
			background-color: var(--peach);
			background-image: linear-gradient(120deg, var(--peach), var(--red));
			background-size: 150% 100%;
			background-position: top left;
			font-weight: 600;
			color: #11111b;
		}

		.btn-mauve {
			background-color: var(--mauve);
			background-image: linear-gradient(120deg, var(--pink), var(--mauve));
			background-size: 150% 100%;
			background-position: top left;
			font-weight: 600;
			color: #11111b;
		}

		.btn-green {
			background-color: var(--green);
			background-image: linear-gradient(120deg, var(--teal), var(--green));
			background-size: 150% 100%;
			background-position: top left;
			font-weight: 600;
			color: #11111b;
		}

		.btn-blue {
			background-color: var(--blue);
			background-image: linear-gradient(120deg, var(--blue), var(--sky));
			background-size: 150% 100%;
			background-position: top left;
			font-weight: 600;
			color: #11111b;
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
			background-color: var(--text);
		}

		input[type='range']::-moz-range-thumb {
			cursor: pointer;
			border: none;
			/* Remove Firefox default browser style */
			background-color: var(--text);
		}

		@media screen and (max-width: 768px) {
			button {
				font-size: 1rem;
			}

			input {
				font-size: 1rem;
			}
		}
	}
</style>
