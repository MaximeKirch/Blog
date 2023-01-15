const express = require("express");
const post = express.Router();
const bodyParser = require("body-parser");
const PostModel = require("../Models/PostModel");
const UserModel = require("../Models/UserModel");
const { ObjectId } = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const { ObjectID } = require("bson");
const pipeline = promisify(require("stream".pipeline));

module.exports.getPosts = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data :", err);
  }).sort({ crDate: -1 });
};

module.exports.getOnePost = (req, res) => {
  const _id = req.params.id;
  PostModel.fineOne(_id, (err, doc) => {
    if (!err) res.send(doc);
    else console.log("Error to get data:", err);
  });
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      )
        throw Error("Invalid file type.");
      if (req.file.size > 500000) throw Error("Max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(500).json({ errors });
    }
  }

  fileName = req.body.authorId + Date.now() + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/client/public/uploads/posts/${fileName}`)
  );

  const newPost = new PostModel({
    authorId: req.body.posterId,
    authorName: req.body.posterName,
    title: req.body.title,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts" + fileName : "",
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send("ID unkwon : " + req.params.id);

  const updatedRecord = {
    subject: req.body.subject,
    title: req.body.title,
    updateDate: Date.now(),
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send("ID Unknown" + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error while deleting : ", err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send("ID Unknown " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send("ID Unknown " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs).select("-password");
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

module.exports = post;
