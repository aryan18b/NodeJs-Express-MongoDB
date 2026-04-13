import Book, {type IBook} from '../models/book.model.js'
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

export const getAllBooksAsync = async () => {
    return await Book.find().populate('author');
};

export const getBookByIdAsync = async (id: string) => {
    return await Book.findById(id).populate('author');
};

export const addBookAsync = async (data: Partial<IBook>) => {
    const newBook: IBook = new Book({
        title: data.title,
        author: data.author,
        coverImagePath: data.coverImagePath
    });

    const result = await Book.create(newBook);    
    return result;
};

export const deleteBookAsync = async (id: string) => {
    return await Book.deleteOne({_id: id});
};

export const updateBookAsync = async (id: string, data: IBook) => {
    return await Book.findByIdAndUpdate(id, {title: data.title, author: data.author});
}