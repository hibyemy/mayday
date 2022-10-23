const express = require('express');
const app = express();

app.post('/api/sos', (request, response) => {
    console.log('Hit by post request :(');
});

app.listen(3000, () => console.log('Listening on port 3000'));