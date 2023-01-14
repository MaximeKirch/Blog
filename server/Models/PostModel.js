const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  crDate: {
    type: Date,
    required: true,
  },
  updateDate: {
    type: Date,
    required: false,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
