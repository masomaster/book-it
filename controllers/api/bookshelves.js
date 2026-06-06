const Bookshelf = require('../../models/bookshelf');
const Book = require('../../models/book');

module.exports = {
  getBookshelves,
  addBookshelf,
  getHighlightedBookshelf,
  addBook,
  updateBookshelf,
  updateBookshelvesContents,
  deleteBookshelf
};

async function getBookshelves(req, res) {
  const bookshelves = await Bookshelf.getBookshelves(req.user._id);
  res.json(bookshelves);
}

async function addBookshelf(req, res) {
  const bookshelf = await Bookshelf.create({ ...req.body, user: req.user._id });
  res.json(bookshelf);
}

async function getHighlightedBookshelf(req, res) {
  const bookshelf = await Bookshelf.getHighlightedBookshelf(req.user._id).populate('books');
  res.json(bookshelf);
}

async function addBook(req, res) {
  const newBookshelves = await Bookshelf.addBook(req.user._id, req.body.newBookId, req.body.bookshelfIds, req.body.newBookshelves)
  res.json(newBookshelves);
}

async function updateBookshelf(req, res) {
  const newBookshelfInfo = { ...req.body.newBookshelfInfo };
  delete newBookshelfInfo.user;
  const updatedBookshelf = await Bookshelf.findOneAndUpdate(
    { _id: req.body.bookshelfId, user: req.user._id },
    newBookshelfInfo,
    { new: true }
  ).populate('books');
  if (!updatedBookshelf) {
    return res.status(404).json({ error: 'Bookshelf not found' });
  }
  res.json(updatedBookshelf);
}

async function updateBookshelvesContents(req, res) {
  const shelvesAndTitles = await Bookshelf.updateBookshelvesContents(req.user._id, req.body.bookId, req.body.bookshelfIds, req.body.newBookshelfTitle)
  res.json(shelvesAndTitles);
}

async function deleteBookshelf(req, res) {
  const deletedBookshelf = await Bookshelf.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deletedBookshelf) {
    return res.status(404).json({ error: 'Bookshelf not found' });
  }
  const bookshelves = await Bookshelf.getBookshelves(req.user._id).populate('books');
  res.json(bookshelves);
}