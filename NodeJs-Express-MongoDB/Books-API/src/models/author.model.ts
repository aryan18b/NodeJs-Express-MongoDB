import mongoose from 'mongoose'

export interface IAuthor{
    name: string
}

const authorSchema = new mongoose.Schema<IAuthor>({
    name: {type: String, required: true}
});

const Author = mongoose.model<IAuthor>('Author', authorSchema);

export default Author;