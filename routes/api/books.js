const express = require('express');
const router = express.Router();
const booksCtrl = require('../../controllers/api/books');

router.get('/', booksCtrl.getLibrary);
router.get('/next', booksCtrl.getNextUp);
router.post('/new', booksCtrl.addBook);

module.exports = router;
