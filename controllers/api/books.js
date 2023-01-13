const { Configuration, OpenAIApi } = require("openai");
const Book = require('../../models/book');

module.exports = {
  getLibrary,
  addBook,
  getNextUp,
  getInProgressBooks,
  getBooksRead,
  updateBook,
  getRecs,
  deleteBook,
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

async function getBooksRead(req, res) {
  const books = await Book.getBooksRead(req.user._id)
  res.json(books)
}

async function deleteBook(req, res) {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  const books = await Book.getLibrary(req.user._id);
  res.json(books);
}

async function updateBook(req, res) {
  const updatedBook = await Book.findByIdAndUpdate(req.body.bookId, req.body.newBookInfo, {new: true});
  res.json(updatedBook);
}

async function getRecs(req, res) {
  const configuration = new Configuration({
    organization: "org-eVtGfFGWJhLqwyGuYbMWzr4E",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.query,
    max_tokens: 4000
  });
  console.log(response.data.choices[0].text);
  res.json(response.data.choices[0].text);
}