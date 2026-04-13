import * as bookService from '../services/books.service.js'
import { type RequestHandler } from 'express';

export const getBooksAsync: RequestHandler = async function (req, res, next) {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const skip = (page - 1) * limit;
        const { books, totalItems } = await bookService.getBooksAsync(skip, limit);
        const totalPages = Math.ceil(totalItems/limit);
        const meta = {
            page,
            limit,
            totalItems,
            totalPages
        }
        return res.json({ meta, data: books });
    } catch (error) {
        next(error);
    }
}

export const getBookByIdAsync: RequestHandler<{ id: string }> = async function (req, res, next) {
    try {
        const id = req.params.id;
        const book = await bookService.getBookByIdAsync(id);

        if (!book) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.json(book);
    } catch (error) {
        next(error);
    }
}

export const addBookAsync: RequestHandler<{}, any, any> = async function (req, res, next) {
    try {
        const coverImage = req.file;
        const filename = coverImage?.filename;
        const bookData = { ...req.body, coverImagePath: filename }
        const newBook = await bookService.addBookAsync(bookData);

        return res.status(201).json({ message: "book created", data: newBook })
    } catch (error) {
        next(error);
    }
}

export const deleteBookAsync: RequestHandler<{ id: string }> = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await bookService.deleteBookAsync(id);

        if (result.deletedCount <= 0) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.status(200).json({ message: 'book deleted' });
    } catch (error) {
        next(error);
    }
}

export const updateBookAsync: RequestHandler<{ id: string }, any, any> = async function (req, res, next) {
    try {
        const id = req.params.id;
        const updatedBook = await bookService.updateBookAsync(id, req.body);

        if (!updatedBook) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.status(200).json({ message: "book updated", data: updatedBook });
    } catch (error) {
        next(error);
    }
}
