const express = require('express');
const { getAllSunriseSunsets } = require('./controllers/externalApiController');

const router = express.Router();

// Get all sunset & sunrise results
router.get('/', (req, res) => {
	getAllSunriseSunsets().then(
		(results) =>{
			return res.send(results);
		}, (err) => {
			res.sendStatus(500).send(err);
		}
	);
});

module.exports = router;