const fowardMessage = require("./sms")
const express = require('express');
const app = express();
app.use(express.json())

app.post('/api/sos', (req, res) => {
    console.log('Hit by post request from IP: \"' + req.ip +  '\" :(');
    console.log("Request:",req.body)
    json = req.body
    message = json.message
    recievers = json.recievers
    fowardMessage.send(message, sender, recievers)
    res.end("Request recieved. Request was: \"" + req.body + "\"")
});

app.listen(3000, () => console.log('Listening on port 3000'));