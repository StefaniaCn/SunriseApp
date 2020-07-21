const express = require('express');

const app = express();
const port = process.env.port || 3000;

const endpoints = require('./endpoints');
app.use('/', endpoints);

const server = app.listen(port, ()=> {
	console.log(`Server running on port ${port}.`);
});

module.exports = { app, server };