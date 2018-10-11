const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    body: {
       type: string,
       required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    mediaUrl: {
        type: string,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [CommentSchema],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});