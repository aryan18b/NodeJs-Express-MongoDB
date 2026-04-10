import * as authorService from '../services/author.service.js'

export const getAllAuthorsAsync = async (req, res, next) => {
    try {
        const authors = await authorService.getAllAuthors();
        return res.json(authors);
    } catch (error) {
        next(error);
    }
}