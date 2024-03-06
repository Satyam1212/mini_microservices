const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };

    console.log('Post created:', { id, title }); // Log created post

    try {
        // Emit a PostCreated event
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: { id, title }
        });
        console.log('PostCreated event sent successfully');
    } catch (error) {
        console.error('Error sending PostCreated event:', error.message);
    }

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event:', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log("v20")
    console.log("Listening on port 4000");
});
