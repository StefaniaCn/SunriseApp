/**
 * Utility function to generate a random float in range
 * @param {int} from lowest value in the range
 * @param {int} to highest value in range
 * @param {int} fixed number of digits to appear after decimal point
 */
function generateRandomInRange(from, to, fixed) {
	return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

/**
 * Function to generate an array of coordinates objects
 * @param {int} itemsNo number of items to be generated
 */
function generateRandLatLng(itemsNo) {
	if (itemsNo === 0) {
		return [];
	}
	const obj = {
		lat: generateRandomInRange(-90, 90, 3),
		lng: generateRandomInRange(-180, 180, 3)
	};
	return [].concat(obj, generateRandLatLng(itemsNo - 1));
};

module.exports = generateRandLatLng;