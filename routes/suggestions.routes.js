const express = require('express');
const suggestionsController = require('../controllers/suggestions.controller');
const { ensureAuth } = require('../middlewares/auth.mw');
const router = express.Router();

router
	.route('/get-users')
	.get(ensureAuth, suggestionsController.getRandomUsers);
router
	.route('/get-suggestions')
	.get(ensureAuth, suggestionsController.getIndustrySuggestions);

module.exports = router;
