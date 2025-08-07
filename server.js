const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store books
let books = [];

// ✅ GET /books - Return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// ✅ POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: Date.now().toString(), // simple unique id
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// ✅ PUT /books/:id - Update book by ID
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const { title, author } = req.body;

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  book.title = title ?? book.title;
  book.author = author ?? book.author;

  res.json(book);
});

// ✅ DELETE /books/:id - Delete book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1);
  res.json({ message: 'Book deleted', book: deletedBook[0] });
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
