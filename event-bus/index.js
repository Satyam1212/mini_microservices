const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', (req, res) =>{
    const event = req.body;

    axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4000.app.github.dev/events', event).catch((err)=>{
        console.log(err.message)
    });
    axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4001.app.github.dev/events', event).catch((err)=>{
        console.log(err.message)
    });
    axios.post('https://jubilant-umbrella-v7w79q9w9q3jp9-4002.app.github.dev/events', event).catch((err)=>{
        console.log(err.message)
    });

    res.send({ status: 'OK'})
});

app.listen(4005, () =>{
    console.log('Listening on 4005')
})