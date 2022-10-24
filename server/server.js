const express = require('express');
const app = express();

app.post('/api/sos', (req, res) => {
    console.log('Hit by post request from IP: \"' + req.ip +  '\" :(');
    res.end("Request recieved.")
});

app.listen(3000, () => console.log('Listening on port 3000'));