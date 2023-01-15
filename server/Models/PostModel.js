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
  picture : {
    type: String
  },
  authorName: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  likers: {
    type: [String],
    required : true,
  },
  comments : {
    type: [
      {
        commenterId : String, 
        commenterPseudo : String, 
        text: String, 
        timestamp : Number
      },
    ]
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

module.exports = mongoose.model('posts', PostSchema)
