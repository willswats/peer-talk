<script lang="ts">
	interface Props {
		roomId: string | undefined;
	}

	const { roomId }: Props = $props();

	interface embededApp {
		id: string;
		title: string;
		url: string;
	}

	let embededApps: embededApp[] = [
		{
			id: 'wbo',
			title: 'WBO',
			url: `https://wbo.ophir.dev/boards/${roomId}`
		},
		{
			id: 'etherpad',
			title: 'Etherpad',
			url: `https://etherpad.communitydata.science/p/${roomId}`
		}
	];
</script>

<section>
	{#each embededApps as embededApp (embededApp.id)}
		<button
			onclick={() => {
				const iframe = document.querySelector(`#${embededApp.id}`);
				if (iframe) {
					iframe.requestFullscreen();
				}
			}}>Fullscreen</button
		>
		<iframe
			id={embededApp.id}
			title={embededApp.title}
			width="500"
			height="500"
			allow="fullscreen"
			src={embededApp.url}
		>
		</iframe>
	{/each}
</section>

<style>
</style>
