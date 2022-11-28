const Book = require('../../models/book');

module.exports = {
  getLibrary,
  addBook,
  getNextUp,
  getInProgressBooks
};

async function getLibrary(req, res) {
  const books = await Book.getLibrary(req.user._id)
  res.json(books);
}

async function addBook(req, res) {
  const book = await Book.create(req.body);
  res.json(book)
}

async function getNextUp(req, res) {
  const book = await Book.getNextUp(req.user._id)
  res.json(book)
}

async function getInProgressBooks(req, res) {
  const books = await Book.getInProgressBooks(req.user._id)
  res.json(books)
}