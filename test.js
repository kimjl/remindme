// Filename: server.js
var mongooseServerAddress = 'mongodb://127.0.0.1:27017/test';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.listen(5000);

// console.log("App listening on port 5000");

mongoose.connect(mongooseServerAddress);

var Reminder = mongoose.model('Reminder', {
    text: String,
    time: Number,
    phonenumber: String,
    approved: String
});


// Reminder.findOneAndDelete({blocked: '+17034894857'})
// Reminder.approved = '+17034894857'
// Reminder.approved = 'testing'
// Reminder.create({approved: 'testing'})
Reminder.deleteMany({approved: 'testing'});
// console.log(Reminder.approved);
// console.log(Reminder);
Reminder.findOne({approved: 'testing'}, function(error, exist) {
  if (exist && !error){
    console.log('The Number exists so dont send message')
  } else {
    console.log('The number doesnt exist so send message')
  }
});

// if (Reminder.find({approved:'+17034894857'}).limit(1).length == 1){
//   //if approve doesn't match we send message
//   console.log('Message sending soon.')
// }else{
//   //if approved matches we block
//   console.log('Your number is blocked.')
// };
