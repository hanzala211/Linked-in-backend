const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/post', require('./post.routes'));
router.use('/profile', require('./user.routes'));

module.exports = router;
