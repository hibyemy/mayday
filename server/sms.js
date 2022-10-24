require('dotenv').config()
const validator = require('./validator.js')

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNumber = process.env.SENDER_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports.send = function(message, recievers) {
    console.log("GOT BODY:",message)
    var failed_to_send = []
    recievers.forEach(contact => {
        if (validator.validateNumber(contact)) {
            console.log("Number whitelisted & validated.")
            client.messages 
                .create({
                    body: message, 
                    from: senderNumber, 
                    to: contact
                })
                .then(message => console.log(message.sid))
                // .catch(error => console.log(error));
        }
        else {
            console.error("Error. Not a whitelisted/valid number.")
            failed_to_send.push(contact)
        }
    })
    return failed_to_send
}
    
                    