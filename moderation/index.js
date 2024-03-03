const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Received Event:', type, data); // Log received event

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log('Comment status:', status); // Log determined status

        try {
            // Send CommentModerated event with determined status
            await axios.post('http://localhost:4005/events', {
                type: 'CommentModerated',
                data: {
                    id: data.id,
                    postId: data.postId,
                    status,
                    content: data.content
                }
            });
            console.log('CommentModerated event sent successfully');
        } catch (error) {
            console.error('Error sending CommentModerated event:', error.message);
        }
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on port 4003');
});
