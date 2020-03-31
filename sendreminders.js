// Twilio Account SID
var twilioAccountSid = 'SID';
// Twilio Auth Token
var twilioAuthToken = 'TOKEN';
// Twilio phone number to send SMS from.
var twilioNumber = 'NUM';
// Set to how frequently the queue should be checked.
var frequencyMilliseconds = 10000;
// Mongo DB server address
var mongooseServerAddress = 'mongodb://127.0.0.1:27017/test';

/*********** End Configuration ***********/

var client = require('twilio')(twilioAccountSid, twilioAuthToken);
var mongoose = require('mongoose');

mongoose.connect(mongooseServerAddress);

var Reminder = mongoose.model('Reminder', {
	text: String,
	time: Number,
	phonenumber: String,
	blocked: String
});

// Reminder.findOneAndDelete({blocked: '+17034894857'})
// Reminder.remove({blocked: '+17034894857'})
// Reminder.blocked = '+17033995053'
// Reminder.create({blocked: '+17033995053'})

Reminder.findOneAndUpdate({ blocked: '+5555555555' });
// Check if the number is blocked, if so don't send the message
Reminder.findOne({ blocked: '+5555555555' }, function(error, exist) {
	//Number exists so we block
	if (exist && !error) {
		console.log('The Number exists so dont send message');
	} else {
		//Number doesn't exist so we proceed
		setInterval(function() {
			var timeNow = new Date();
			console.log(Math.floor(timeNow.getTime()));

			// Find any reminders that have already passed, process them, and remove them from the queue.
			Reminder.find({ time: { $lt: Math.floor(timeNow.getTime()) } }, function(err, reminders) {
				if (err) {
					console.log(err);
					return;
				}

				if (reminders.length == 0) {
					console.log('no messages to be sent');
					return;
				}

				reminders.forEach(function(message) {
					client.messages.create(
						{
							body: message.text,
							to: '+1' + message.phonenumber,
							from: '+1' + twilioNumber
						},
						function(err, sms) {
							if (err) console.log(err);

							console.log('sending ' + message.text + ' to ' + message.phonenumber);
							process.stdout.write(sms.sid);
						}
					);

					Reminder.remove({ _id: message._id }, function(err) {
						console.log(err);
					});
				});
			});
		}, frequencyMilliseconds);
	}
});
