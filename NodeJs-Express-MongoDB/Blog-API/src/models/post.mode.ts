import mongoose from "mongoose";

interface IPost{
    title: string,
    body:string,
    author: mongoose.Types.ObjectId,
    tags: [string],
}

const postSchema = new mongoose.Schema<IPost>({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    tags: {type: [String]}
}, {timestamps: true})

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;