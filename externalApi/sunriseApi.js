const fetch = require('node-fetch');

// Function to check the status of the result
function checkStatus(res) {
	if (res.ok) {
		return res;
	} else {
		throw new Error(`Sunrise-sunset API returned: ${res.status} ${res.statusText}`);
	}
};

/**
 * Function to get sunrise and sunset times based on lat & lng
 * @param {obj} item An object which has latitude and longitude
 */
function getSunriseSunset(item) {
	return fetch(`https://api.sunrise-sunset.org/json?lat=${item.lat}&lng=${item.lng}&formatted=0`)
		.then(checkStatus)
		.then(response => {
			return response.json();
		}).then(responseJson =>{
			// Add lat, lng to the result obj and return it
			responseJson.results.lat = item.lat;
			responseJson.results.lng = item.lng;
			return responseJson;
		}).catch(err => {
			// Throw the error to stop Promise.map early if there
			// is a problem with the API
			throw err;
		});
};

module.exports = getSunriseSunset;