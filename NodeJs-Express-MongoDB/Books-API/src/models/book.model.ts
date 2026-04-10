import mongoose from 'mongoose'

export interface IBook {
    title: string,
    author: mongoose.Types.ObjectId
}

const bookSchema = new mongoose.Schema<IBook>({
    title: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'Author' }
})

const Book = mongoose.model<IBook>('Book', bookSchema)

export default Book;