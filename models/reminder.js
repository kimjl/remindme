var mongoose = require('mongoose');

var reminderSchema = new mongoose.Schema({
	text: String,
	time: Number,
	phonenumber: String,
	blocked: String
});

module.exports = mongoose.model('Reminder', reminderSchema);
