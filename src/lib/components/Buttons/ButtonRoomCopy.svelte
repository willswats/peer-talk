<script lang="ts">
	import UserAddLine from '$lib/components/svg/UserAddLine.svelte';
	import { Button } from '$lib/components/Buttons';
</script>

<!-- TODO: Change this to use an overlay where users can copy the link -->
<Button onclick={() => navigator.clipboard.writeText(window.location.href)}
	><UserAddLine width={24} height={24} /></Button
>
