const express = require('express')
const PORT = 8000;
const app = express();

app.use(express.json())
app.listen(PORT, () => console.log(`App is running on ${PORT}`));

const books = []

app.get('/books', function (req, res) {
    // res.end(JSON.stringify(books));
    return res.json(books);
})

app.get('/books/:id', function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const book = books.find(book => book.id === id);
    if (!book) return res.status(404).json({ error: `book with id: ${id} not found` });

    return res.json(book);
})

app.post('/books', function (req, res) {
    const { title, author } = req.body;
    if (!title) return res.status(400).json({ error: "title cannot be empty" });
    if (!author) return res.status(400).json({ error: "author cannot be empty" });

    const max_id_task = books.reduce(function (max, book) {
        return book.id > max ? book.id : max;
    }, 0);

    const id = max_id_task + 1;
    const book = { id, title, author };
    books.push(book);

    return res.status(201).json({ message: "book created" })
})

app.delete('/books/:id', function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });

    const indexToDelete = books.findIndex(book => book.id === id);
    console.log(indexToDelete);

    if (indexToDelete < 0) return res.status(404).json({ error: `book with id: ${id} not found` });

    books.splice(indexToDelete, 1);

    return res.status(201).json({ message: 'book deleted' });
})