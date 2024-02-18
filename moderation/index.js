const express = require('express')
const axios = require('axios')

const app = express();
app.use(express.json());

app.post('/events', async(req, res) => {
    const { type, data } = req.body;

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected': 'aprroved';

        await axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4005.app.github.dev/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    res.send({})

});

app.listen(4003, () => {
    console.log('Listening on 4003');
})

