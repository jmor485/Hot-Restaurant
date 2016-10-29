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
	console.log('home page requested');
	res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

app.get('/tables', function (req, res) {
  console.log('tables page requested');
  res.sendFile(path.join(__dirname, 'app/public/tables.html'));
});

app.get('/reserve', function (req, res) {
  console.log('reserve page requested');
  res.sendFile(path.join(__dirname, 'app/public/reserve.html'));
});



var tables = [
  {name: "tom",
  phone: "1234567890",
  email: "tom@tom.com",
  customerID: 1},
  {name: "matt",
  phone: "1555567890",
  email: "matt@matt.com",
  customerID: 2},
  {name: "tomtom",
  phone: "9999999999",
  email: "tomtom@tomtom.com",
  customerID: 3},
  {name: "tom2",
  phone: "1234567890",
  email: "tom@tom.com",
  customerID: 4},
  {name: "matt2",
  phone: "1555567890",
  email: "matt@matt.com",
  customerID: 5},
  {name: "tomtom2",
  phone: "9999999999",
  email: "tomtom@tomtom.com",
  customerID: 6}
  ];

app.get('/api/tables', function (req, res) {
  // console.log('table data requested');
  // var response = "testing";
  res.json(tables);
});

// reserve API call
app.post('/api/reserve', function (req, res) {
	console.log('reserve request submitted');
	console.log(req.body);

  var newReservation = req.body;

  tables.push(newReservation);

  //console.log(tables);

  // Check if user is in the first 5 in list
  var isBooked;
  if(tables.length <= 5){
    isBooked = true;
  }
  else{
    isBooked = false;
  }

  res.json(isBooked);

});


app.post('/api/clear', function (req, res) {
  console.log('clear all tables');
  tables = [];
  res.sendFile(path.join(__dirname, 'app/public/tables.html'));
});

app.post('/api/killreservation', function (req, res) {
  console.log(req.body.id);

  tables.splice(req.body.id, 1);
  // console.log(tables);
  res.json(tables);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});
