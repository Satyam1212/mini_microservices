const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

//make sure that we add in a body parser to make sure that whenever a user sends us some JSON data in the body, the request actually gets parsed.so it actually shows up appropriately inside of a request handler

const app = express(); //create new app
app.use(bodyParser.json());

//here we are not using any database
//below one is kind of repository of post we created
const posts = {};

app.get('/posts',(req, res) => {
    //whatever we post created that we directly sends here
    res.send(posts);

})

app.post('/posts',(req, res) => {
    //when someone wants to create post then we will randomly generated ID for that import randomByte
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };
    //201 indicated we just created a resource
    res.status(201).send(posts[id])
    
})

app.listen(4000, ()=>{
    console.log("Listening on 4000")
})