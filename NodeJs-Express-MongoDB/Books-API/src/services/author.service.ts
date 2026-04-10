import Author, {type IAuthor} from '../models/author.model.js'

export const getAllAuthors = async () =>{
    return await Author.find();
}