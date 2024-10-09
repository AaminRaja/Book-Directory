let { Schema, model } = require('mongoose')

let BooksSchema = new Schema({
    title: {
        type: String,
        required: { value: true, message: "book's title is mandatory" }
    },
    author: {
        type: String,
        required: { value: true, message: "book's author name is mandatory" }
    },
    language: {
        type: String,
        required: { value: true, message: "book's language is mandatory" }
    },
    category: {
        type: String,
        required: { value: true, message: "book's category is mandatory" }
    },
    publisher: {
        type: String,
        required: { value: true, message: "book's publisher is mandatory" }
    },
    edition: {
        type: String,
    },
    price: {
        type: String,
        required: { value: true, message: "book's price is mandatory" }
    },
    numberOfPieces: {
        type: Number,
        required: { value: true, message: "book's numberOfPieces is mandatory" }
    }
})

let Books = model('Books', BooksSchema)
module.exports = Books