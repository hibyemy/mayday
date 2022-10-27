const fowardMessage = require("./sms");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.set('trust proxy', 'loopback');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var origin_whitelist = process.env.HOST.split(' ')

var corsOptions = {
    origin: origin_whitelist,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.post('/api/sos', (req, res) => {
    console.log('Hit by post request from IP: \"' + req.ip +  '\" :(');
    console.log("Request:", req.body);
    var json = req.body;
    var message = json.message;
    var contacts = json.contacts;
    var response = fowardMessage.send(message, contacts).toString();
    res.setHeader('Content-Type', 'text/plain')
    res.end("Message recieved. " + response);
});

app.listen(7116, () => console.log('Listening on port 7116.'));