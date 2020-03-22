# Remind me
An application built with Node.js and Twilio. A user can send themselves a text message at a specific time when selected.

## Visit at:
http://remindme.network/

## How to use:
To install. make sure you are in the directory you want the folder to be in. In your terminal use the following command:
```
git clone https://github.com/kimjl/remindme.git
```

## Using Twilio:
You will need a Twilio account SID, Token and Number provided by Twilio. You can sign up for a free account at:
> https://www.twilio.com/
You will need these in order to send yourself a text message using Twilio's free service.
Once you have your relevant Twilio information, open up the send reminders.js file and replace the following and save:
```
var twilioAccountSid = 'YOURTWILIOACCOUNTSID';

var twilioAuthToken = 'YOURTWILIOAUTHTOKEN';

var twilioNumber = 'YOURTWILIONUMBER';
```

## Running locally:
```
npm install
```

To launch the application you can use 2 terminal windows, one for each command below:
```
node server.js

node sendreminders.js
```
