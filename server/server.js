const fowardMessage = require("./sms")
const express = require('express');
const app = express();
app.use(express.urlencoded())
app.set('trust proxy', 'loopback')

app.post('/api/sos', (req, res) => {
    console.log('Hit by post request from IP: \"' + req.ip +  '\" :(');
    console.log("Request:",req.body)
    json = req.body
    message = json.message
    var recievers = []
    recievers.push(json.phonenumber1)
    recievers.push(json.phonenumber2)
    recievers.push(json.phonenumber3)
    recievers.push(json.phonenumber4)
    recievers.push(json.phonenumber5)
    var response = fowardMessage.send(message, recievers).toString()
    res.end("Message recieved. Failed to send to: " + response)
});

app.listen(7116, () => console.log('Started.'));