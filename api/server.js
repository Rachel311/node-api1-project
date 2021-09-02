// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

// server.get('/', (req, res) =>{
//     res.json({ message: 'hello' })
// });

// GET request to call a user
server.get('/api/users', (req, res)=> {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
            })
        })
})

// GET request to call a user by ID
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(500).json({
            message: 'The user with the specified ID does not exist',
    }
})

// POST request to create a new user
server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            const newUser = await User.insert(req.body)
        res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the user to the database',
    }
})

// 

module.exports = server; // EXPORT YOUR SERVER instead of {}
