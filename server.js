// Filename: server.js
var mongooseServerAddress = 'mongodb://127.0.0.1:27017/test';

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

// var reminderRoutes = require('./routes/reminders');

app.use(bodyParser.json());
app.listen(3000);

console.log('App listening on port 3000');

mongoose.connect(mongooseServerAddress);

// app.use('/', reminderRoutes);

var Reminder = mongoose.model('Reminder', {
	text: String,
	time: Number,
	phonenumber: String,
	blocked: String
});

// Returns reminders associated with the given phone number.
app.get('/api/reminders', function(req, res) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	Reminder.find({ phonenumber: query.phonenumber }, function(err, reminders) {
		if (err) res.send(err);

		res.json(reminders);
	});
});

// Adds a reminder for a specific phone number.
app.post('/api/reminders', function(req, res) {
	var r = Reminder.create(
		{
			text: req.body.text,
			time: req.body.time,
			phonenumber: req.body.phonenumber
		},
		function(err, reminder) {
			if (err) res.send(err);

			res.send(reminder);
		}
	);
});

// Removes a reminder.
app.post('/api/reminders/remove', function(req, res) {
	Reminder.remove({ _id: req.body.reminderId }, function(err, reminder) {
		if (err) res.send(err);
	});
});

app.use(express.static(__dirname + '/public'));
