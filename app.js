const generateRandLatLng = require('./generator');
const getSunriseSunset = require('./sunriseApi');
const Promise = require('bluebird');
const moment = require('moment');

// Generates a given number of lat & lng pairs
const randomLatLng = generateRandLatLng(100);

/**
 * Maps the randomLatLng array and for each object calls
 * the api with the respective lat & lng
 * Using Promise.map to make sure no more the 5 api calls
 * are ran in parallel
 */
Promise.map(randomLatLng,
	object => getSunriseSunset(object),
	{ concurrency: 5 })
	.then(resultsArr => {
		// Console.log the array of results for display purposes
		console.log(resultsArr);
		const earliestSunriseResult = resultsArr
			.reduce((earliestSunrise, currentValue) => {
				if(moment(currentValue.results.sunrise)
					.isBefore(moment(earliestSunrise.results.sunrise))
					&& currentValue.results.day_length !== 0) {
					return currentValue;
				}
				return earliestSunrise;
			}, {
				results: {
					sunrise: moment().add(2, 'days'),
				},
			});
		// Change the format of day_length key to a 'HH:mm:ss' format
		earliestSunriseResult.results.day_length =
			moment({}).seconds(earliestSunriseResult.results.day_length).format('HH:mm:ss');
		// Console.log the result for display purposes
		console.log('Final result:');
		console.log(earliestSunriseResult);

	}).catch(err => {
		console.warn(`Error: ${err.message} `);
	});