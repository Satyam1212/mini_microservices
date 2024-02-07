const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) =>{
    res.s

})

app.post('/posts/:id/comments', (req, res) =>{
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    //if comments not already created then below might give us undefined thats why added [] empty array
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content})
    
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments)

})

app.listen(4001, () => {
    console.log("Listening on 4001")
})