import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const commentSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: true,
      minLength: [255, 'Post is too long'],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  });
  
const comment = mongoose.model('Comment', commentSchema);

export default comment;