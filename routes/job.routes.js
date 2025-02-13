const express = require('express');
const { ensureAuth } = require('../middlewares/auth.mw');
const jobController = require('../controllers/job.controller');

const router = express.Router();

router.post('/create', ensureAuth, jobController.createJob);
router.get('/list', ensureAuth, jobController.getJobs);
router.get('/', ensureAuth, jobController.searchJobs);
router.get('/:id', ensureAuth, jobController.getJob);

module.exports = router;
