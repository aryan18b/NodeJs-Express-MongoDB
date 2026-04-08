const Book = require('../models/book.model')

/* In-Memory DB controller functions
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
*/

exports.getAllBooksAsync = async function (req, res, next) {
    try {
        const books = await Book.find();
        return res.json(books);
    } catch (error) {
        next(error);
    }
}

exports.getBookByIdAsync = async function (req, res, next) {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);

        if(!book) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.json(book);
    } catch (error) {
        next(error);
    }
}

exports.addBookAsync = async function (req, res, next) {
    try {        
        const data = req.body;

        const newBook = new Book({
            title: data.title,
            author: data.author
        });

        await Book.create(newBook);
        return res.status(201).json({ message: "book created", data: newBook })
    } catch (error) {
        next(error);
    }
}

exports.deleteBookAsync = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await Book.deleteOne({_id: id});
        
        if(result.deletedCount <= 0) return next({ message: `book with id: ${id} not found`, statusCode: 404 });
        
        return res.status(200).json({ message: 'book deleted' });
    } catch (error) {
        next(error);
    }
}

exports.updateBookAsync = async function (req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;

        const updatedBook = await Book.findByIdAndUpdate(id, {title: data.title, author: data.author});
        console.log(updatedBook);
        
        if(!updatedBook) return next({ message: `book with id: ${id} not found`, statusCode: 404 });

        return res.status(200).json({ message: "book updated", data: updatedBook });        
    } catch (error) {
        next(error);
    }
}
