require('dotenv').config()

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

module.exports.send = function(message, recievers) {
    console.log("GOT BODY:",message)
    recievers.forEach(contact => {
        console.log("GOT RECIEVER:",contact)
    // client.messages 
    // .create({
    //     body: 'Hi there', 
    //     from: process.env.SENDER_NUMBER, 
    //     to: process.env.RECIVER_NUMBER
    // })
    // .then(message => console.log(message.sid))
    // .catch(error => console.log(error));
    })
}
    
                    