import mongoose from 'mongoose'

export interface IBook {
    title: string,
    author: mongoose.Types.ObjectId,
    coverImagePath: string
}

const bookSchema = new mongoose.Schema<IBook>({
    title: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'Author' },
    coverImagePath: {type: String, default: 'cover-image.png'}
})

const Book = mongoose.model<IBook>('Book', bookSchema)

export default Book;