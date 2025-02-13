const express = require('express');
const suggestionsController = require('../controllers/suggestions.controller');
const { ensureAuth } = require('../middlewares/auth.mw');
const router = express.Router();

router.route('/users').get(ensureAuth, suggestionsController.getRandomUsers);
router
	.route('/industry')
	.get(ensureAuth, suggestionsController.getIndustrySuggestions);

module.exports = router;
