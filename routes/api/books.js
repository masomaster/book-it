const express = require('express');
const router = express.Router();
const booksCtrl = require('../../controllers/api/books');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const {
  recsLimiter,
  googleBooksLimiter,
} = require('../../config/rateLimits');

router.get(
  '/google-volumes',
  ensureLoggedIn,
  googleBooksLimiter,
  booksCtrl.googleVolumes
);
router.get('/', ensureLoggedIn, booksCtrl.getLibrary);
router.get('/next', ensureLoggedIn, booksCtrl.getNextUp);
router.get('/current', ensureLoggedIn, booksCtrl.getInProgressBooks);
router.get('/totalbooks', ensureLoggedIn, booksCtrl.getBooksRead);
router.post('/new', ensureLoggedIn, booksCtrl.addBook);
router.post('/updatebook', ensureLoggedIn, booksCtrl.updateBook);
router.post('/getrecs', ensureLoggedIn, recsLimiter, booksCtrl.getRecs);
router.delete('/deletebook/:id', ensureLoggedIn, booksCtrl.deleteBook);

module.exports = router;
