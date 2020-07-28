export function formatTags (d, dollar) {
	
    let val = Math.abs(d);

	let flag = 0;
	let yValue = '';    

	if(d < 0) {
		flag = 1;
	}

	if (val < 1000) {
		yValue = val;
	}

	// if the val gte 1,000 and lt 1,000,000
	if(val >= 1000 && val < 1000000) {
		val = Math.floor(val / 1000);
		val = val.toFixed(0);
		yValue = val.toString();
		yValue = dollar + yValue + 'K';
	}

	// if the val gte 1,000,000 and lt 1,000,000,000
	if(val >= 1000000 && val < 1000000000) {
		val = Math.floor(val / 1000000);
		val = val.toFixed(0);
		yValue = val.toString();
		yValue = dollar + yValue + 'M';
	}

	// if the val gte 1,000,000,000 and lt 1,000,000,000,000
	if(val >= 1000000000 && val < 1000000000000) {
		val = Math.floor(val / 1000000000);
		val = val.toFixed(0);
		yValue = val.toString();
		yValue = dollar + yValue + 'B';
	}
	
	if(flag) {
		yValue = "(" + yValue + ")";
	}

	return yValue;

}

export default formatTags;