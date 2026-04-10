import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'Author' }
})

const Book = mongoose.model('Book', bookSchema)

export default Book;