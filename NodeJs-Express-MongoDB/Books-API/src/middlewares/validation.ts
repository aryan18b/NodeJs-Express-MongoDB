import mongoose from 'mongoose'
import { type RequestHandler } from 'express';
import { type IBook } from '../models/book.model.js';

export const validateId : RequestHandler<{id: string}> = function (req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return next({ message: `id is not valid`, statusCode: 400 });
    next();
}

export const validateBody : RequestHandler<any, any, Partial<IBook>> = function (req, res, next) {
    const data = req.body;
    if (!data.title) return next({ message: "title cannot be empty", statusCode: 400 });
    if (!data.author) return next({ message: "author cannot be empty", statusCode: 400 });
    next();
}