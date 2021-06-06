const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
        post: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        author: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Like', likeSchema);