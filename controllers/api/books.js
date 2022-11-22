const Book = require('../../models/book');

module.exports = {
  getLibrary,
  addBook,
};

async function getLibrary(req, res) {
  const books = await Book.getLibrary(req.user._id)
  res.json(books);
}

async function addBook(req, res) {
  const book = await Book.create(req.body);
  res.json(book)
}