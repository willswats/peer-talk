<script lang="ts">
	import HangUp from '$lib/components/svg/HangUp.svelte';
	import { disconnectUser } from '$lib/utils/disconnectUser';
	import './buttons.css';
</script>

<button onclick={disconnectUser}><HangUp width={24} height={24} /></button>
