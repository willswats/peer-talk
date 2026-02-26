<script lang="ts">
	interface Props {
		roomId: string | undefined;
		username: string;
		localMicStream: MediaStream | null;
		localVideoStream: MediaStream | null;
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

{#each embededApps as embededApp (embededApp.id)}
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
