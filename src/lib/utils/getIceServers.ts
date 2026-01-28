export async function getIceServers() {
	const response = await fetch(
		`https://peer-talk.metered.live/api/v1/turn/credentials?apiKey=${import.meta.env.VITE_METERED_API_KEY}`
	);
	const iceServers = await response.json();
	return iceServers;
}
