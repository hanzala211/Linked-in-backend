const express = require('express');
const postController = require('../controllers/post.controller');
const uploadPictures = require('../middlewares/upload');
const { ensureAuth } = require('../middlewares/auth.mw');

const router = express.Router();

router
	.route('/create')
	.post(
		ensureAuth,
		uploadPictures.postImageUpload.array('image', 10),
		postController.createPost
	);

router.route('/posts/:id').get(ensureAuth, postController.getAllUserPosts);
router.route('/like/:id').post(ensureAuth, postController.likePost);
router.route('/dislike/:id').post(ensureAuth, postController.disLikePost);

router.route('/feed').get(ensureAuth, postController.getFeedPosts);
router.get('/saved-posts', ensureAuth, postController.getSavedPosts);

router.route('/comment/:id').post(ensureAuth, postController.postComment);
router.route('/comments/:id').get(ensureAuth, postController.getComments);
router.route('/six-posts/:id').get(ensureAuth, postController.getSixPosts);
router.route('/post/:id').get(ensureAuth, postController.getPost);
router.route('/save/:id').get(ensureAuth, postController.savePost);
router.route('/unsave/:id').get(ensureAuth, postController.unSavePost);
router.route('/delete/:id').delete(ensureAuth, postController.deletePost);
router
	.route('/update/:id')
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
