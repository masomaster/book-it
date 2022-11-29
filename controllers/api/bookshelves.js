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
  .populate('books')
  .exec(function(err, bookshelf) {
      if (err) {
          handleError(err);
          console.log('failed to populate')
      } else {
          res.json(bookshelf)
      }
  });
}

async function addBook(req, res) {
  const bookshelf = await Bookshelf.findOne({
    user: req.user._id,
    _id: req.body.bookshelfID
  })
  bookshelf.books.push(req.body.newBookID)
  bookshelf.save();
  res.json(bookshelf);
}