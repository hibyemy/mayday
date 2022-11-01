if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const validator = require('./validator.js');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNumber = process.env.SENDER_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports.send = function(message, recievers) {
    console.log("GOT BODY:",message);
    if (message == '') {
        return "Error: Cannot send empty message.";
    }
    if (recievers == ['']) {
        return "Error: No contacts to send to.";
    }
    let failed_to_send = [];
    let deduplicated_list = [...new Set(recievers)];
    console.log("Deduplicating contacts:", deduplicated_list)
    if (deduplicated_list.length > 5) {
        let extra_numbers = deduplicated_list.splice(5);
        console.error("Warning: Recieved more than 5 numbers. Truncated:", extra_numbers);
        failed_to_send.push(extra_numbers);
    }
    deduplicated_list.forEach(contact => {
        if (validator.validateNumber(contact)) {
            console.log("Number whitelisted & validated.");
            client.messages 
                 .create({
                     body: message, 
                     from: senderNumber, 
                     to: contact
                 })
                 .then(message => console.log(message.sid))
                 .catch(error => console.log(error));
        }
        else {
            console.error("Error: Not a whitelisted/valid number.");
            failed_to_send.push(contact);
        }
    })
    let failed_numbers = failed_to_send.toString();
    if (failed_numbers == '') {
        return "Message sent.";
    }   
    else {
        return "Error: Failed to send to "+failed_numbers;
    }
}