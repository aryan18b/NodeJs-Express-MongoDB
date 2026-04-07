const bookService = require('../services/books.service')

exports.getAllBooks = function (req, res) {
    const books = bookService.getAllBooks();
    return res.json(books);
}

exports.getBookById = function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const book = bookService.getBookById(id);
    if (!book) return res.status(404).json({ error: `book with id: ${id} not found` });

    return res.json(book);
}

exports.addBook = function (req, res) {
    const data = req.body;
    if (!data.title) return res.status(400).json({ error: "title cannot be empty" });
    if (!data.author) return res.status(400).json({ error: "author cannot be empty" });

    const book = bookService.addBook(data);

    return res.status(201).json({ message: "book created", data: book })
}

exports.deleteBook = function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const deleted = bookService.deleteBook(id);

    if(!deleted) return res.status(404).json({ error: `book with id: ${id} not found` });    

    return res.status(201).json({ message: 'book deleted' });
}

exports.updateBook = function (req, res) {
    const book = req.body;
    if (!book.title) return res.status(400).json({ error: "title cannot be empty" });
    if (!book.author) return res.status(400).json({ error: "author cannot be empty" });

    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const updatedBook = bookService.updateBook(id, book);
    if(!updatedBook) return res.status(404).json({ error: `book with id: ${id} not found` });    

    return res.status(200).json({ message: "book updated", data: updatedBook })
}