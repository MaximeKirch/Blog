const express = require('express');
const post = express.Router();
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

// As a user, i want to get all posts
post.get('/', (req,res) => {
    res.status(200).send("All posts on JSON format.")
})

// As a user, i want to get one post 
post.get('/:id', (req, res) => {
    const post = req.params.id;
    res.status(200).send(`My post with id ${post}`)
})

// As administrator, i want to send a new post
post.post('/', (req,res) => {
    res.status(200).send('Got a post request');
})

// As administrator, i want to edit a post already sent with is ID
post.put('/:id', (req,res) => {
    const post = req.params.id;
    res.status(201).send(`Post edited with ID ${post}`)
})

// As administrator, i want to delete a post 
post.delete('/:id', (req,res) => {
    const post = req.params.id;
    res.status(200).send(`Post with ID ${post} has been deleted.`)
})

module.exports = post;