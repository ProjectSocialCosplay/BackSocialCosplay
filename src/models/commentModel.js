const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: true,
      maxLength: [255, 'Comment is too long'],
      trim: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  });
  
const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;