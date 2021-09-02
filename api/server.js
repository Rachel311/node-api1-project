// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();

server.get('/', (req, res) =>{
    res.status(200);
    res.send('Hello World!')
})

module.exports = {}; // EXPORT YOUR SERVER instead of {}
