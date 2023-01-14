const express = require("express");
const post = express.Router();
const bodyParser = require("body-parser");
const { Post } = require("../Models/PostModel");
const mongoose = require("mongoose");
const client = require("../Database/Connect");

const jsonParser = bodyParser.json();

// As a user, i want to get all posts
post.get("/", async (req, res) => {
  client.connect((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const Post = client.db("Blog").collection("Posts");
    Post.find().toArray((err, result) => {
      if (err) res.status(404).send(err);
      if (result) res.status(200).json(result);
      client.close();
    });
  });
});

// As a user, i want to get one post
post.get("/:id", async (req, res) => {
  const { id } = req.params.id;
  client.connect((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const Post = client.db("Blog").collection("Posts");
    Post.findOne(id, (err, result) => {
      if (err) res.status(404).send(err);
      if (result) res.status(200).json(result);
      client.close();
    });
  });
});

// As administrator, i want to send a new post
post.post("/", async (req, res) => {
  const newPost = new Post({
    authorId: req.body.authorId,
    authorName: req.body.authorName,
    title: req.body.title,
    subject: req.body.subject,
    crDate: new Date(),
  });

  client.connect((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const Post = client.db("Blog").collection("Posts");
    Post.insertOne(newPost, (err, result) => {
      if (err) res.status(404).send(err);
      if (result) res.status(200).json(result);
      client.close();
    });
  });
});

// As administrator, i want to edit a post already sent with is ID
post.put("/:id", (req, res) => {
  const { _id } = req.params;
  const updatedPost = {
    $set: {
      title: req.body.title,
      subject: req.body.subject,
      updateDate: new Date(),
    },
  };

  client.connect(async (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    const Post = client.db("Blog").collection("Posts");
    Post.updateOne({ _id: _id }, updatedPost, (err, result) => {
      if (err) res.status(500).json(err);
      if (result) res.status(200).json(result);
    });
  });
});

// As administrator, i want to delete a post
post.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const authorId = req.body.authorId;
  const userConnected = req.body.userConnected;
  client.connect((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (authorId === userConnected) {
      const Post = client.db("Blog").collection("Posts");
      Post.deleteOne(_id, (err, result) => {
        if (err) res.status(404).send(err);
        if (result) res.status(200).json(result);
        client.close();
      });
    } res.status(403).send(`Operation not allowed.`)
  });
});

module.exports = post;
