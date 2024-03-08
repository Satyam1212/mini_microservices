const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    console.log('Received Event:', type, data); // Log received event

    if (type === 'PostCreated') {
        const { id, title } = data;
        console.log('Creating new post:', { id, title });
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        console.log('Creating new comment:', { id, content, postId, status });

        if (posts[postId]) {
            posts[postId].comments.push({ id, content, status });
        } else {
            console.error('Post not found for comment:', postId);
        }
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        console.log('Updating comment:', { id, content, postId, status });

        const post = posts[postId];
        if (post) {
            const comment = post.comments.find(comment => comment.id === id);
            if (comment) {
                comment.content = content;
                comment.status = status;
            } else {
                console.error('Comment not found:', id);
            }
        } else {
            console.error('Post not found for comment:', postId);
        }
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on port 4002');
    try {
        const response = await axios.get('http://event-bus-srv:4005/events');
        const events = response.data;
        for (const event of events) {
            console.log('Processing Event:', event.type);
            handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
    }
});
