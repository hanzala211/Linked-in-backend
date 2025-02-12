const express = require('express');
const postController = require('../controllers/post.controller');
const uploadPictures = require('../middlewares/upload');
const { ensureAuth } = require('../middlewares/auth.mw');

const router = express.Router();

router
	.route('/create-post')
	.post(
		ensureAuth,
		uploadPictures.postImageUpload.array('image', 10),
		postController.createPost
	);

router.route('/get-posts/:id').get(ensureAuth, postController.getAllUserPosts);
router.route('/like-post/:id').get(ensureAuth, postController.likePost);
router.route('/dislike-post/:id').get(ensureAuth, postController.disLikePost);

router.route('/feed-posts').get(ensureAuth, postController.getFeedPosts);

router.route('/post-comment/:id').post(ensureAuth, postController.postComment);
router.route('/get-comments/:id').get(ensureAuth, postController.getComments);
router.route('/get-six-posts/:id').get(ensureAuth, postController.getSixPosts);
router.route('/get-post/:id').get(ensureAuth, postController.getPost);
router.route('/save-post/:id').get(ensureAuth, postController.savePost);
router.route('/unsave-post/:id').get(ensureAuth, postController.unSavePost);
router.route('/delete-post/:id').delete(ensureAuth, postController.deletePost);
router
	.route('/update-post/:id')
	.put(
		ensureAuth,
		uploadPictures.postProfilePic.array('image', 10),
		postController.editPost
	);

router.route('/create-article').post(ensureAuth, postController.createArticle);
router
	.route('/update-article/:id')
	.patch(ensureAuth, postController.editArticle);

module.exports = router;
