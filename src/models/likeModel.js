const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
        post: {
            type:  Schema.Types.ObjectId,
            ref: 'Post',
        },
        author: {
            type:  Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Like', likeSchema);