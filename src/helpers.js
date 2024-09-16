export const randomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function getRandomNumber(min, max, decimalPlaces) {
	const randomNum = Math.random() * (max - min) + min;
	return parseFloat(randomNum.toFixed(decimalPlaces));
}

export function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function getXBackgroundColor(x) {
	if (x < 2) {
		return 'rgb(62, 91, 194)';
	} else if (x >= 2 && x <= 10) {
		return 'rgb(117, 62, 194)';
	} else {
		return 'rgb(222, 139, 3)';
	}
}

