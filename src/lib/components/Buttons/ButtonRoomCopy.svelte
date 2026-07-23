<script lang="ts">
	import UserAddLine from '$lib/components/svg/UserAddLine.svelte';
	import './buttons.css';
</script>

<!-- TODO: Change this to use an overlay where users can copy the link -->
<button onclick={() => navigator.clipboard.writeText(window.location.href)}
	><UserAddLine width={24} height={24} /></button
>
