const generateRandLatLng = require('../util/generator');
const getSunriseSunset = require('../externalApi/sunriseApi');
const Promise = require('bluebird');
const moment = require('moment');

/**
 * Maps the randomLatLng array and for each object calls
 * the api with the respective lat & lng
 * Using Promise.map to make sure no more the 5 api calls
 * are ran in parallel
 */
function getAllSunriseSunsets() {
	// Generates a given number of lat & lng pairs
	const randomLatLng = generateRandLatLng(100);
	return Promise.map(randomLatLng,
		object => getSunriseSunset(object),
		{ concurrency: 5 })
		.then(resultsArr => {
			const finalArr = resultsArr.map(element =>{
				// Clean up the results array to only return what is needed
				return {
					sunrise: element.results.sunrise,
					sunset: element.results.sunset,
					day_length: element.results.day_length,
					lat: element.results.lat,
					lng: element.results.lng
				};
			});
			// Console.log the earliest sunrise
			// TODO: add the earliest sunrise to the final array
			getEarliestSunrise(finalArr);
			return finalArr;

		}).catch(err => {
			console.warn(`Error: ${err.message} `);
		});
}
/**
 * Function to get the earliest sunrise object
 * Disregards objects which have day_length value of 0
 * @param {array} resultsArr and array of objects with sunrise & day_length properties
 */
function getEarliestSunrise(resultsArr) {
	const earliestSunriseResult = resultsArr
		.reduce((earliestSunrise, currentValue) => {
			if(moment(currentValue.sunrise)
				.isBefore(moment(earliestSunrise.sunrise))
					&& currentValue.day_length !== 0) {
				return currentValue;
			}
			return earliestSunrise;
		}, {
			sunrise: moment().add(2, 'days')
		});
	// console.log the earliest sunrise for display purposes
	console.log('Final result:');
	console.log(earliestSunriseResult);
}

module.exports = { getEarliestSunrise, getAllSunriseSunsets };