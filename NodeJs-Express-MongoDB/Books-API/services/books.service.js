const { BOOKS } = require('../models/books');

exports.getAllBooks = () => {
    return BOOKS;
};

exports.getBookById = (id) => {
    const book = BOOKS.find(book => book.id === id);
    return book || null;
};

exports.addBook = (title, author) => {
    const maxId = BOOKS.reduce((max, book) => {
        return book.id > max ? book.id : max;
    }, 0);

    const id = maxId + 1;
    const newBook = { id, title, author };

    BOOKS.push(newBook);

    return newBook;
};

exports.deleteBook = (id) => {
    const index = BOOKS.findIndex(book => book.id === id);

    if (index === -1) return false;

    BOOKS.splice(index, 1);
    return true;
};