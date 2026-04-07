const bookService = require('../services/books.service')

exports.getAllBooks = function (req, res, next) {
    try {
        const books = bookService.getAllBooks();
        return res.json(books);        
    } catch (error) {
        next(error);
    }
}

exports.getBookById = function (req, res, next) {
    try {        
        const id = req.validated.id;
        const book = bookService.getBookById(id);    
    
        // if (!book) return res.status(404).json({ error: `book with id: ${id} not found` });
        if (!book) return next({ message: `book with id: ${id} not found`, statusCode: 404 });
    
        return res.json(book);
    } catch (error) {
        next(error);
    }
}

exports.addBook = function (req, res, next) {
    try {        
        const data = req.body;
        const book = bookService.addBook(data);
    
        return res.status(201).json({ message: "book created", data: book })
    } catch (error) {
        next(error);
    }
}

exports.deleteBook = function (req, res, next) {
    try {        
        const id = req.validated.id;
        const deleted = bookService.deleteBook(id);
    
        // if(!deleted) return res.status(404).json({ error: `book with id: ${id} not found` });    
        if (!deleted) return next({ message: `book with id: ${id} not found`, statusCode: 404 });
    
        return res.status(200).json({ message: 'book deleted' });
    } catch (error) {
        next(error);
    }
}

exports.updateBook = function (req, res, next) {
    try {
        const data = req.body;
        const id = req.validated.id;
    
        const updatedBook = bookService.updateBook(id, data);
        if(!updatedBook) return next({ message: `book with id: ${id} not found`, statusCode: 404 });
    
        return res.status(200).json({ message: "book updated", data: updatedBook });        
    } catch (error) {
        next(error);
    }
}