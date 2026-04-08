const authorService = require('../services/author.service');

exports.getAllAuthorsAsync = async (req, res, next) => {
    try {
        const authors = await authorService.getAllAuthors();
        return res.json(authors);
    } catch (error) {
        next(error);
    }
}