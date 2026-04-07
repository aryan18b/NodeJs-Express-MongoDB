const bookService = require('../services/books.service')

exports.getAllBooks = function (req, res) {
    const books = bookService.getAllBooks();
    return res.json(books);
}

exports.getBookById = function (req, res) {
    const id = req.params.id;
    const book = bookService.getBookById(id);

    if (!book) return res.status(404).json({ error: `book with id: ${id} not found` });

    return res.json(book);
}

exports.addBook = function (req, res) {
    const data = req.body;
    const book = bookService.addBook(data);

    return res.status(201).json({ message: "book created", data: book })
}

exports.deleteBook = function (req, res) {
    const id = req.params.id;
    const deleted = bookService.deleteBook(id);

    if(!deleted) return res.status(404).json({ error: `book with id: ${id} not found` });    

    return res.status(201).json({ message: 'book deleted' });
}

exports.updateBook = function (req, res) {
    const data = req.body;
    const id = req.params.id;

    const updatedBook = bookService.updateBook(id, data);
    if(!updatedBook) return res.status(404).json({ error: `book with id: ${id} not found` });    

    return res.status(200).json({ message: "book updated", data: updatedBook })
}