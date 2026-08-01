<script lang="ts">
	import { SvgUserAddLine } from '$lib/components/svg';
	import { Button } from '$lib/components/Buttons';
	import OverlayShare from '$lib/components/OverlayShare.svelte';

	let shareShown = $state(false);
</script>

<OverlayShare bind:shareShown />
<Button onclick={() => (shareShown = true)}>
	<span class="svg-container--small">
		<SvgUserAddLine />
	</span>
</Button>
