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
        if (!user) {
            res.status(404).json({
                message:'The user with the specified ID does not exist'
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user information could not be retrieved',
    }
        )}
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
        )}
})

// PUT request to update existing user
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const updated = await User.update(id, body)
        if (!updated) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            res.json(updated)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user information could not be modified',
    }
        )}
})

// DELETE request to delete existing user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    const deleteUser = User.delete(id)
    .then(deletedUser => {
        if (!deletedUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
        })
        } else {
            res.json(deleteUser)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'The user could not be removed',
    }
        )}
    )
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
