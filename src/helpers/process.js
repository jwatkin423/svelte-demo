export function processPoints (data) {
	let tmpEl = '';
	let maxValue = Math.max.apply(null, data);
	return tickMarks(maxValue);
}