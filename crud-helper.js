// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Book = require('./models/book');
const Bookshelf = require('./models/bookshelf');


// Local variables will come in handy for holding retrieved documents
let user, book, bookshelf;
let users, books, bookshelves;
