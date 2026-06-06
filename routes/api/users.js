const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const {
  loginLimiter,
  signupLimiter,
} = require('../../config/rateLimits');

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.post('/', signupLimiter, usersCtrl.create);
router.post('/login', loginLimiter, usersCtrl.login);

module.exports = router;