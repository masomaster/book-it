const Bookshelf = require('../../models/bookshelf');
const Book = require('../../models/book');

module.exports = {
  getBookshelves,
  addBookshelf,
  getHighlightedBookshelf,
  addBook
};

async function getBookshelves(req, res) {
  const bookshelves = await Bookshelf.getBookshelves(req.user._id)
  res.json(bookshelves);
}

async function addBookshelf(req, res) {
  const bookshelf = await Bookshelf.create(req.body);
  res.json(bookshelf)
}

async function getHighlightedBookshelf(req, res) {
  const bookshelf = await Bookshelf.getHighlightedBookshelf(req.user._id)
  console.log('bookshelf from controller', bookshelf)
  const books = await Book.find({
    user: req.user._id,
    bookshelf: bookshelf._id
  })
  console.log('books on said bookshelf', books)
  res.json({
    bookshelf: bookshelf,
    books: books
  })
}

async function addBook(req, res) {
  console.log(req.body)
  const bookshelf = await Bookshelf.findOne({
    user: req.user._id,
    _id: req.body.bookshelfID
  })
  bookshelf.books.push(req.body.newBookID)
  res.json(bookshelf);
}