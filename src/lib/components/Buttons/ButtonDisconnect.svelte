<script lang="ts">
	import HangUp from '$lib/components/svg/HangUp.svelte';
	import { disconnectUser } from '$lib/utils/disconnectUser';
	import CustomAlert from '$lib/components/CustomAlert.svelte';
	import { Button } from '$lib/components/Buttons';

	let alertShown = $state(false);
</script>

<CustomAlert confirmFunction={disconnectUser} bind:alertShown
	>Are you sure you want to disconnect from this room?</CustomAlert
>
<Button
	onclick={() => {
		alertShown = true;
	}}><HangUp width={24} height={24} /></Button
>
