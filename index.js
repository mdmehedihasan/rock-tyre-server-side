const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


//middleware
app.use(cors());
app.use(express.json());

//creat an api for test the server
app.get('/', (req, res) => {
    res.send('Running Rock Tyre Server')
});

//for listenig the server to run to the port 50000
app.listen(port, () => {
    console.log('Listening to port', port);
});