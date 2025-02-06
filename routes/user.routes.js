const express = require('express');
const userController = require('../controllers/user.controller');
const { ensureAuth } = require('../middlewares/auth.mw');
const { postProfilePic, postProfileBanner } = require('../middlewares/upload');
const router = express.Router();

router.route('/update-profile').post(ensureAuth, userController.editProfile);
router
	.route('/profile-pic')
	.post(
		ensureAuth,
		postProfilePic.single('image'),
		userController.updateProfilePic
	);

router
	.route('/profile-banner')
	.post(
		ensureAuth,
		postProfileBanner.single('image'),
		userController.updateProfileBanner
	);

router
	.route('/remove-profile-pic')
	.delete(ensureAuth, userController.removeProfilePic);

router.route('/remove-banner').delete(ensureAuth, userController.removeBanner);

module.exports = router;
