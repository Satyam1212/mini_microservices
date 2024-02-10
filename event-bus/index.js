const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) =>{
    const event = req.body;

    axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4000.app.github.dev/events', event);
    axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4001.app.github.dev/events', event);
    axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4002.app.github.dev/events', event);

    res.send({ status: 'OK'})
});

app.listen(4005, () =>{
    console.log('Listening on 4005')
})