const express = require('express');
const { ensureAuth } = require('../middlewares/auth.mw');
const jobController = require('../controllers/job.controller');
const { uploadPDF } = require('../middlewares/upload');

const router = express.Router();

router.post('/create', ensureAuth, jobController.createJob);
router.get('/list', ensureAuth, jobController.getJobs);
router.get('/', ensureAuth, jobController.searchJobs);
router.get('/:id', ensureAuth, jobController.getJob);
router.post(
	'/apply/:id',
	ensureAuth,
	uploadPDF.single('file'),
	jobController.applyToJob
);

module.exports = router;
