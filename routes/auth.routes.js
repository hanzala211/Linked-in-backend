const express = require('express');
const authController = require('../controllers/auth.controller');
const { ensureAuth } = require('../middlewares/auth.mw');
const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/me').get(ensureAuth, authController.me);
router.route('/update-name').post(ensureAuth, authController.updateName);
router.route('/search').get(authController.searchUser);

module.exports = router;
