const Bookshelf = require('../../models/bookshelf');

module.exports = {
  getBookshelves,
  addBookshelf,
};

async function getBookshelves(req, res) {
  const bookshelves = await Bookshelf.getBookshelves(req.user._id)
  res.json(bookshelves);
}

async function addBookshelf(req, res) {
  const bookshelf = await Bookshelf.create(req.body);
  res.json(bookshelf)
}
