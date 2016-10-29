// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
	console.log('home access requested');
	res.sendFile(path.join(__dirname, 'app/public/survey.html'));
});

app.get('api/tables', function (req, res) {
		console.log('table data requested');
	res.sendFile(path.join(__dirname, 'allchar.html'));
});

// reserve API call
app.post('api/reserve', function (req, res) {
	console.log('reserve request submitted');
	console.log(req);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});
