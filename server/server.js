const fowardMessage = require("./sms");
const express = require('express');
const cors = require('cors');
const ratelimit = require('express-rate-limit');
const app = express();
app.use(express.json());
app.set('trust proxy', 'loopback');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || '7116'

let origin_whitelist = process.env.HOST.split(' ')

let corsOptions = {
    origin: origin_whitelist,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

let rateLimiterOptions = {
    windowMs: 20 * 60 * 1000, // 20 minute timeframe
	max: 5, // 5 API hits allowed
    message: "You are being rate limited.",
	standardHeaders: true,
	legacyHeaders: false
}

app.use('/api', ratelimit(rateLimiterOptions))

app.post('/api/sos', (req, res) => {
    console.log('['+new Date()+'] Hit by post request from IP: \"' + req.ip +  '\" :(');
    console.log("Request:", req.body);
    let json = req.body;
    let message = json.message;
    let contacts = json.contacts;
    let response = fowardMessage.send(message, contacts).toString();
    res.setHeader('Content-Type', 'text/plain');
    res.end("Message recieved. " + response);
});

app.listen(PORT, () => console.log('Listening on port', PORT));