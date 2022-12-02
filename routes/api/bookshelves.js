const express = require('express');
const router = express.Router();
const bookshelvesCtrl = require('../../controllers/api/bookshelves');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, bookshelvesCtrl.getBookshelves);
router.get('/highlighted', ensureLoggedIn, bookshelvesCtrl.getHighlightedBookshelf);
router.post('/new', ensureLoggedIn, bookshelvesCtrl.addBookshelf);
router.post('/addbook', ensureLoggedIn, bookshelvesCtrl.addBook);
router.post('/updatebookshelf', ensureLoggedIn, bookshelvesCtrl.updateBookshelf);
router.delete('/deletebookshelf/:id', ensureLoggedIn, bookshelvesCtrl.deleteBookshelf);

module.exports = router;
