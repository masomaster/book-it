const express = require('express');
const router = express.Router();
const booksCtrl = require('../../controllers/api/books');

router.get('/', booksCtrl.getLibrary);
router.post('/new', booksCtrl.addBook);

module.exports = router;
