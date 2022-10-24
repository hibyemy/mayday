const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/sos', (req, res) => {
    console.log('Hit by post request from IP: \"' + req.ip +  '\" :(');
    console.log("Request:",req.body)
    res.end("Request recieved. Request was: \"" + req.body + "\"")
});

app.listen(3000, () => console.log('Listening on port 3000'));