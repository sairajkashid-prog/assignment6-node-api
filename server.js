const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let books = [
  { id: 1, name: "Atomic Habits", author: "James Clear" },
  { id: 2, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

// GET
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    name: req.body.name,
    author: req.body.author
  };
  books.push(newBook);
  res.json(newBook);
});

// PATCH
app.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).send("Not found");

  if (req.body.name) book.name = req.body.name;
  if (req.body.author) book.author = req.body.author;

  res.json(book);
});

// DELETE
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.send("Deleted");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});