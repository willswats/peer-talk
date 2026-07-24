<script lang="ts">
	import HangUp from '$lib/components/svg/HangUp.svelte';
	import { disconnectUser } from '$lib/utils/disconnectUser';
	import { Button } from '$lib/components/Buttons';
</script>

<Button onclick={disconnectUser}><HangUp width={24} height={24} /></Button>
