<script lang="ts">
	interface Props {
		roomId: string | undefined;
	}

	const { roomId }: Props = $props();

	interface embededApp {
		id: string;
		title: string;
		url: string;
		userConsent: boolean;
	}

	let embededApps: embededApp[] = $state([
		{
			id: 'wbo',
			title: 'WBO',
			url: `https://wbo.ophir.dev/boards/${roomId}`,
			userConsent: false
		},
		{
			id: 'etherpad',
			title: 'Etherpad',
			url: `https://etherpad.communitydata.science/p/${roomId}`,
			userConsent: false
		}
	]);
</script>

<section>
	{#each embededApps as embededApp (embededApp.id)}
		{#if embededApp.userConsent}
			<div>
				<iframe
					id={embededApp.id}
					title={embededApp.title}
					width="500"
					height="500"
					allow="fullscreen"
					src={embededApp.url}
				>
				</iframe>
				<button
					onclick={() => {
						const iframe = document.querySelector(`#${embededApp.id}`);
						if (iframe) {
							iframe.requestFullscreen();
						}
					}}>Fullscreen</button
				>
			</div>
		{:else}
			<div>
				<p>{embededApp.title}</p>
				<p>Press the button if you consent to rendering the app</p>
				<button
					onclick={() => {
						const app = embededApps.find((app) => app.id === embededApp.id);
						if (app) {
							console.log(app);
							app.userConsent = true;
						}
					}}>Consent</button
				>
			</div>
		{/if}
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
