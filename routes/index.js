const express = require('express');

const router = express.Router();

router.use('/', require('./pdf.routes'));
router.use('/auth', require('./auth.routes'));
router.use('/post', require('./post.routes'));
router.use('/profile', require('./user.routes'));
router.use('/suggestions', require('./suggestions.routes'));

module.exports = router;
