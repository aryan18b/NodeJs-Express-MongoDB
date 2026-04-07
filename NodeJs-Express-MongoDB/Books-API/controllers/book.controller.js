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
    const { title, author } = req.body;
    if (!title) return res.status(400).json({ error: "title cannot be empty" });
    if (!author) return res.status(400).json({ error: "author cannot be empty" });

    const book = bookService.addBook(title, author);

    return res.status(201).json({ message: "book created", id: book.id })
}

exports.deleteBook = function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const deleted = bookService.deleteBook(id);

    if(!deleted){
        return res.status(404).json({ error: `book with id: ${id} not found` });
    }

    return res.status(201).json({ message: 'book deleted' });
}