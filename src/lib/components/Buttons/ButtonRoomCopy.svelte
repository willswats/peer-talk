<script lang="ts">
	import UserAddLine from '$lib/components/svg/UserAddLine.svelte';
	import { Button } from '$lib/components/Buttons';
	import OverlayShare from '$lib/components/OverlayShare.svelte';

	let shareShown = $state(false);
</script>

<!-- TODO: Change this to use an overlay where users can copy the link -->

<OverlayShare bind:shareShown />
<Button onclick={() => (shareShown = true)}><UserAddLine width={24} height={24} /></Button>
