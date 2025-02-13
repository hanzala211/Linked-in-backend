const express = require('express');
const userController = require('../controllers/user.controller');
const { ensureAuth } = require('../middlewares/auth.mw');
const { postProfilePic, postProfileBanner } = require('../middlewares/upload');
const router = express.Router();

router.route('/update').post(ensureAuth, userController.editProfile);
router
	.route('/profile-pic')
	.patch(
		ensureAuth,
		postProfilePic.single('image'),
		userController.updateProfilePic
	);

router
	.route('/banner')
	.patch(
		ensureAuth,
		postProfileBanner.single('image'),
		userController.updateProfileBanner
	);

router
	.route('/profile-pic')
	.delete(ensureAuth, userController.removeProfilePic);

router.route('/banner').delete(ensureAuth, userController.removeBanner);

router.route('/follow/:id').post(ensureAuth, userController.followUser);
router.route('/unfollow/:id').post(ensureAuth, userController.unFollowUser);
router.route('/follow').get(ensureAuth, userController.getFollow);

module.exports = router;
