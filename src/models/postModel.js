import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: [255, 'Post is too long'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
});

const post = mongoose.model('post', postSchema);

export default post;
