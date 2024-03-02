const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(cors());
app.use(express.json());

app.post('/events', (req, res) =>{
    const event = req.body;
    //post
    axios.post('http://localhost:4000/events', event).catch((err)=>{
        console.log(err.message)
    });
    //comment
    axios.post('http://localhost:4001/events', event).catch((err)=>{
        console.log(err.message)
    });
    //query
    axios.post('http://localhost:4002/events', event).catch((err)=>{
        console.log(err.message)
    });
    axios.post('http://localhost:4005/events', event).catch((err)=>{
        console.log(err.message)
    });

    res.send({ status: 'OK'})
});

app.listen(4005, () =>{
    console.log('Listening on 4005')
})