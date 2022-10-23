// Download the helper library from https://www.twilio.com/docs/node/install
                     // Find your Account SID and Auth Token in Account Info
                     // and set the environment variables. See http://twil.io/secure
                     const accountSid = process.env.TWILIO_ACCOUNT_SID;
                     const authToken = process.env.TWILIO_AUTH_TOKEN;
                     const client = require('twilio')(accountSid, authToken);

                     client.messages 
                      .create({body: 'Hi there', from: '+', to: '+'})
                      .then(message => console.log(message.sid));
                    