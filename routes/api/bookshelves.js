const express = require('express');
const router = express.Router();
const bookshelvesCtrl = require('../../controllers/api/bookshelves');

router.get('/', bookshelvesCtrl.getBookshelves);
router.post('/new', bookshelvesCtrl.addBookshelf);

module.exports = router;
