const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('Received Event:', event); // Log received event

    // Forward the event to other services
    axios.post('http://localhost:4000/events', event)
        .then(() => console.log('Event forwarded to Post Service'))
        .catch((err) => console.error('Error forwarding event to Post Service:', err.message));

    axios.post('http://localhost:4001/events', event)
        .then(() => console.log('Event forwarded to Comment Service'))
        .catch((err) => console.error('Error forwarding event to Comment Service:', err.message));

    axios.post('http://localhost:4002/events', event)
        .then(() => console.log('Event forwarded to Query Service'))
        .catch((err) => console.error('Error forwarding event to Query Service:', err.message));

    axios.post('http://localhost:4003/events', event)
        .then(() => console.log('Event forwarded to Moderation Service'))
        .catch((err) => console.error('Error forwarding event to Moderation Service:', err.message));

    events.push(event); // Add the event to the events array
    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Event Bus Service listening on port 4005');
});
