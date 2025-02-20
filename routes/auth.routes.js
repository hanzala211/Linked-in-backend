const express = require('express');
const authController = require('../controllers/auth.controller');
const { ensureAuth } = require('../middlewares/auth.mw');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', ensureAuth, authController.me);
router.patch('/update-name', ensureAuth, authController.updateName);
router.get('/search', authController.searchUser);
router.post('/forgot-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
