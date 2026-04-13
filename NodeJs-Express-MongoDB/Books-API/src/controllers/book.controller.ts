import * as bookService from '../services/books.service.js'
import {type RequestHandler } from 'express';
// import {type IBook } from '../models/book.model.js';

export const getAllBooksAsync : RequestHandler = async function (req, res, next) {
    try {
        const books = await bookService.getAllBooksAsync();
        return res.json(books);
    } catch (error) {
        next(error);
    }
}

export const getBookByIdAsync : RequestHandler<{id: string}> = async function (req, res, next) {
    try {
        const id = req.params.id;
        const book = await bookService.getBookByIdAsync(id);

        if(!book) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.json(book);
    } catch (error) {
        next(error);
    }
}

export const addBookAsync : RequestHandler<{}, any, any> = async function (req, res, next) {
    try {        
        const coverImage = req.file;        
        const filename = coverImage?.filename;
        const bookData = {...req.body, coverImagePath: filename}
        const newBook = await bookService.addBookAsync(bookData);

        return res.status(201).json({ message: "book created", data: newBook })
    } catch (error) {
        next(error);
    }
}

export const deleteBookAsync : RequestHandler<{id: string}> = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await bookService.deleteBookAsync(id);
        
        if(result.deletedCount <= 0) return next({ message: `book with id: ${id} not found`, statusCode: 404 });
        
        return res.status(200).json({ message: 'book deleted' });
    } catch (error) {
        next(error);
    }
}

export const updateBookAsync : RequestHandler<{id: string}, any, any> = async function (req, res, next) {
    try {
        const id = req.params.id;
        const updatedBook = await bookService.updateBookAsync(id, req.body);
        
        if(!updatedBook) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.status(200).json({ message: "book updated", data: updatedBook });        
    } catch (error) {
        next(error);
    }
}
