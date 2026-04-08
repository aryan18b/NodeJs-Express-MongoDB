const Book = require('../models/book.model')

/* In-Memory Service functions
const { BOOKS } = require('../models/books');

exports.getAllBooks = () => {
    return BOOKS;
};

exports.getBookById = (id) => {
    const book = BOOKS.find(book => book.id === id);
    return book;
};

exports.addBook = (data) => {
    const maxId = BOOKS.reduce((max, book) => {
        return book.id > max ? book.id : max;
    }, 0);

    const id = maxId + 1;
    
    const newBook = { id, title: data.title, author: data.author };
    BOOKS.push(newBook);

    return newBook;
};

exports.deleteBook = (id) => {
    const index = BOOKS.findIndex(book => book.id === id);

    if (index === -1) return false;

    BOOKS.splice(index, 1);
    return true;
};

exports.updateBook = (id, newBook) => {
    const indexToUpdate = BOOKS.findIndex(book => book.id === id);
    if(indexToUpdate < 0) return null;
    
    const updatedBook = {id, ...newBook};
    BOOKS[indexToUpdate] = updatedBook;
    
    return updatedBook;
}
*/

exports.getAllBooksAsync = async () => {
    return await Book.find();
};

exports.getBookByIdAsync = async (id) => {
    return await Book.findById(id);
};

exports.addBookAsync = async (data) => {
    const newBook = new Book({
        title: data.title,
        author: data.author
    });

    const result = await Book.create(newBook);
    console.log(result);
    
    return result;
};

exports.deleteBookAsync = async (id) => {
    return await Book.deleteOne({_id: id});
};

exports.updateBookAsync = async (id, data) => {
    return await Book.findByIdAndUpdate(id, {title: data.title, author: data.author});
}