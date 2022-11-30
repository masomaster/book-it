const express = require('express');
const router = express.Router();
const booksCtrl = require('../../controllers/api/books');

router.get('/', booksCtrl.getLibrary);
router.get('/next', booksCtrl.getNextUp);
router.get('/current', booksCtrl.getInProgressBooks);
router.get('/totalbooks', booksCtrl.getBooksRead);
router.post('/new', booksCtrl.addBook);
router.delete('/deletebook/:id', booksCtrl.deleteBook);

module.exports = router;
