const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    filePath: {
        type: String,
    },
    category: {
        type: String
    },
    author: {
        type: String
    },
    publisher: {
        type: String
    },
    year: {
        type: String,
    },
    rating: {
        type: String,
        default: 0
    }
}, {timestamps:true})

const Book = mongoose.model('Book', bookSchema);

module.exports = { 
    Book 
}