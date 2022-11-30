const express = require('express');
const router = express.Router();
const bookshelvesCtrl = require('../../controllers/api/bookshelves');

router.get('/', bookshelvesCtrl.getBookshelves);
router.get('/highlighted', bookshelvesCtrl.getHighlightedBookshelf);
router.post('/new', bookshelvesCtrl.addBookshelf);
router.post('/addbook', bookshelvesCtrl.addBook);
router.post('/updatebookshelf', bookshelvesCtrl.updateBookshelf);
router.delete('/deletebookshelf/:id', bookshelvesCtrl.deleteBookshelf);

module.exports = router;
