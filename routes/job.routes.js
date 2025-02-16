const express = require('express');
const { ensureAuth } = require('../middlewares/auth.mw');
const jobController = require('../controllers/job.controller');
const { uploadPDF } = require('../middlewares/upload');

const router = express.Router();

router.post('/create', ensureAuth, jobController.createJob);
router.get('/list', ensureAuth, jobController.getJobs);
router.get('/', ensureAuth, jobController.searchJobs);
router.post(
	'/apply/:id',
	ensureAuth,
	uploadPDF.single('file'),
	jobController.applyToJob
);
router.patch('/save/:id', ensureAuth, jobController.saveJob);
router.patch('/unsave/:id', ensureAuth, jobController.unSaveJob);
router.get('/saved-jobs', ensureAuth, jobController.getSavedJobs);
router.get('/posted-jobs', ensureAuth, jobController.getPostedJobs);
router.get('/:id', ensureAuth, jobController.getJob);

module.exports = router;
