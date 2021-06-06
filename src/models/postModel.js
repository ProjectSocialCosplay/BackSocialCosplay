const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: [255, 'Post is too long'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    likes: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Like',
    }],
},{
    timestamps: true,
});

const post = mongoose.model('Post', postSchema);

module.exports =  post;
