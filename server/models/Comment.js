const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    rating: {
        type: Number
    }

}, { timestamps: true })


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }