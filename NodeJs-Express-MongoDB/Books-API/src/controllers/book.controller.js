import * as bookService from '../services/books.service.js'

export const getAllBooksAsync = async function (req, res, next) {
    try {
        const books = await bookService.getAllBooksAsync();
        return res.json(books);
    } catch (error) {
        next(error);
    }
}

export const getBookByIdAsync = async function (req, res, next) {
    try {
        const id = req.params.id;
        const book = await bookService.getBookByIdAsync(id);

        if(!book) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.json(book);
    } catch (error) {
        next(error);
    }
}

export const addBookAsync = async function (req, res, next) {
    try {        
        const newBook = await bookService.addBookAsync(req.body);
        return res.status(201).json({ message: "book created", data: newBook })
    } catch (error) {
        next(error);
    }
}

export const deleteBookAsync = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await bookService.deleteBookAsync(id);
        
        if(result.deletedCount <= 0) return next({ message: `book with id: ${id} not found`, statusCode: 404 });
        
        return res.status(200).json({ message: 'book deleted' });
    } catch (error) {
        next(error);
    }
}

export const updateBookAsync = async function (req, res, next) {
    try {
        const id = req.params.id;
        const updatedBook = await bookService.updateBookAsync(id, req.body);
        
        if(!updatedBook) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.status(200).json({ message: "book updated", data: updatedBook });        
    } catch (error) {
        next(error);
    }
}
