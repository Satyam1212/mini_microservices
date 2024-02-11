const express = require('express');
// const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());//wired up on app as middleware

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) =>{
    res.send(commentsByPostId[req.params.id] || [])

})

app.post('/posts/:id/comments',async (req, res) =>{
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    //if comments not already created then below might give us undefined thats why added [] empty array
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content})
    
    commentsByPostId[req.params.id] = comments;

    await axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4005.app.github.dev/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments)

})

app.post('/events', (req, res) =>{
    console.log('Event Received:', req.body.type)

    res.send({})
})

app.listen(4001, () => {
    console.log("Listening on 4001")
})