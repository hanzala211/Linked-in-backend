const express = require('express');
const userController = require('../controllers/user.controller');
const { ensureAuth } = require('../middlewares/auth.mw');
const { postProfilePic, postProfileBanner } = require('../middlewares/upload');
const router = express.Router();

router.route('/update-profile').post(ensureAuth, userController.editProfile);
router
	.route('/profile-pic')
	.patch(
		ensureAuth,
		postProfilePic.single('image'),
		userController.updateProfilePic
	);

router
	.route('/profile-banner')
	.patch(
		ensureAuth,
		postProfileBanner.single('image'),
		userController.updateProfileBanner
	);

router
	.route('/remove-profile-pic')
	.delete(ensureAuth, userController.removeProfilePic);

router.route('/remove-banner').delete(ensureAuth, userController.removeBanner);

router.route('/follow-user/:id').get(ensureAuth, userController.followUser);
router.route('/unfollow-user/:id').get(ensureAuth, userController.unFollowUser);
router.route('/get-follow').get(ensureAuth, userController.getFollow);

module.exports = router;
