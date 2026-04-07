const express = require('express')
const { BOOKS } = require('../db/books')
const router = express.Router();

router.get('/', function (req, res) {
    return res.json(BOOKS);
})

router.get('/:id', function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const book = BOOKS.find(book => book.id === id);
    if (!book) return res.status(404).json({ error: `book with id: ${id} not found` });

    return res.json(book);
})

router.post('/', function (req, res) {
    const { title, author } = req.body;
    if (!title) return res.status(400).json({ error: "title cannot be empty" });
    if (!author) return res.status(400).json({ error: "author cannot be empty" });

    const max_id_task = BOOKS.reduce(function (max, book) {
        return book.id > max ? book.id : max;
    }, 0);

    const id = max_id_task + 1;
    const book = { id, title, author };
    BOOKS.push(book);

    return res.status(201).json({ message: "book created" })
})

router.delete('/:id', function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const indexToDelete = BOOKS.findIndex(book => book.id === id);

    if (indexToDelete < 0) return res.status(404).json({ error: `book with id: ${id} not found` });

    BOOKS.splice(indexToDelete, 1);

    return res.status(201).json({ message: 'book deleted' });
})

module.exports = router;