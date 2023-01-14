const express = require('express');
const auth = express.Router();
const bodyParser = require('body-parser')


// As user i want to auth myself 
auth.post('/login', (req,res) => {
    const email = req.body.email
    const password = req.body.password
    res.status(200).send(`Hello ${email}, with ${password}`);
})

// As user, i want to disconnect myself 
auth.get('/logout', (req,res) => {
    res.status(200).send('You are disconnected from website')
})

// I want to create a new user
auth.post('/signup', (req,res) => {
    res.status(200).send('User has been created.')
})

module.exports = auth;