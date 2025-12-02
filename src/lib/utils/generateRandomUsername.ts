export function generateRandomUsername() {
	const nameParts = [
		'north',
		'aftermath',
		'laborer',
		'balance',
		'talk',
		'declare',
		'pull',
		'brick',
		'cloistered',
		'utter',
		'flash',
		'soothe',
		'detail',
		'history',
		'near',
		'lovely',
		'ossified',
		'rhythm',
		'chat',
		'lunch',
		'history',
		'aloof',
		'banish',
		'axiomatic',
		'dead',
		'seashore',
		'wiry',
		'ashamed',
		'disastrous',
		'smother',
		'wandering',
		'grow',
		'beneficial',
		'mountainous',
		'motivate',
		'ajar',
		'innate',
		'puzzling',
		'fight',
		'long',
		'river',
		'scattered',
		'star',
		'giants',
		'listen',
		'toad',
		'tail',
		'tasty',
		'statuesque',
		'upset'
	];
	const namePartsInd1 = Math.floor(Math.random() * nameParts.length);
	const namePartsInd2 = Math.floor(Math.random() * nameParts.length);
	const capitalize = (val: string) => String(val).charAt(0).toUpperCase() + String(val).slice(1);

	const name =
		capitalize(nameParts[namePartsInd1]) +
		capitalize(nameParts[namePartsInd2]) +
		Math.floor(Math.random() * 50).toString();

	return name;
}
