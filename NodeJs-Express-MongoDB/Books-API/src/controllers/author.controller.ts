import * as authorService from '../services/author.service.js'
import {type RequestHandler} from 'express';

export const getAllAuthorsAsync: RequestHandler = async (req, res, next) => {
    try {
        const authors = await authorService.getAllAuthors();
        return res.json(authors);
    } catch (error) {
        next(error);
    }
}