// adjust decimal points to a certain number
export function floorTo(value: number, precision: number) {
	var multiplier = Math.pow(10, precision);
	return Math.floor(value * multiplier) / multiplier;
}

export function updateTextView(e) {
	let num = getNumber(e.target.value);
	if (num == 0) {
		e.target.value = '';
	} else {
		e.target.value = num.toLocaleString('en-US');
	}
}

export function getNumber(_str) {
	let arr = _str.split('');
	let out = new Array();
	for (let cnt = 0; cnt < arr.length; cnt++) {
		if (isNaN(arr[cnt]) == false) {
			out.push(arr[cnt]);
		}
	}
	return Number(out.join(''));
}
