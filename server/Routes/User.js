const express = require('express');
const user = express.Router();

// I want to get informations about all users in DB 
user.get('/',(req,res) => {
    res.status(200).send('All users are here').json();
})

// Get one user with ID 
user.get('/:id', (req,res) => {
    const userId = req.params.id
    res.status(200).send(`This is the user ${userId}`).json();
})

// Update my user 
user.put('/:id', (req,res) => {
    const userId = req.params.id
    res.status(201).send(`User ${userId} has been updated`);
})

// Delete my user 
user.delete('/:id', (req,res) => {
    const userId = req.params.id
    res.status(200).send(`User ${userId} has been deleted.`)
})

module.exports = user