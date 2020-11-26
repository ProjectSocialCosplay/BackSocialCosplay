const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({

    description: {
        type: String,
    },
    _id_author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

});

const post = mongoose.model('post', postSchema);

module.exports = post;