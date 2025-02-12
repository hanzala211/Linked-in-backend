const postService = require('../services/post.service');
const cloudinary = require('cloudinary');

module.exports.createPost = async (req, res) => {
	try {
		const id = req.user._id;
		const { caption } = req.body;
		const imageUrls = req.files.map((file) => file.path);
		if (imageUrls.length === 0) {
			const createPost = await postService.createPost(
				{
					postBy: id,
					caption,
				},
				id
			);
			return res.status(201).send({
				status: 'Post Created Successfully',
				post: createPost,
			});
		}

		if (imageUrls.length > 10)
			return res.status(400).send({ status: 'Only 10 images are allowed.' });

		const createPost = await postService.createPost(
			{
				postBy: id,
				imageUrls,
				caption,
			},
			id
		);

		return res.status(201).send({
			status: 'Post Created Successfully',
			post: createPost,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({
			status: 'Server Error',
		});
	}
};

module.exports.getAllUserPosts = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) return res.send({ status: 'ID Not Found' });
		const allPosts = await postService.getAllPosts(id);
		return res.status(200).send({
			status: 'Post Retrieved Successfully',
			data: allPosts,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({
			status: 'Server Error',
		});
	}
};

module.exports.likePost = async (req, res) => {
	try {
		const userId = req.user._id;
		const postId = req.params.id;

		const findAndUpdate = await postService.likePost(userId, postId);
		if (!findAndUpdate) return res.send({ status: 'Post Not Found' });
		return res.status(200).send({
			status: 'Post Liked Successfully',
			data: findAndUpdate,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'Server Error',
		});
	}
};

module.exports.disLikePost = async (req, res) => {
	try {
		const userId = req.user._id;
		const postId = req.params.id;

		const findAndUpdate = await postService.disLikePost(userId, postId);
		if (!findAndUpdate) return res.send({ status: 'Post Not Found' });
		return res.status(200).send({
			status: 'Post DisLiked Successfully',
			data: findAndUpdate,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'Server Error',
		});
	}
};

module.exports.getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const limit = req.query.limit;
		const findPosts = await postService.getFeedPosts(userId, limit);
		if (!findPosts) return res.send({ status: 'No Posts Found' });
		return res.send({
			status: 'Post Retrieved Successfully',
			data: findPosts,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.postComment = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user._id;
		const { comment } = req.body;
		if (!comment) return res.send({ status: 'Comment is required' });
		const updatePost = await postService.postComment(postId, {
			user: userId,
			comment: comment,
		});
		if (!updatePost) return res.send({ status: 'Post Not Found' });
		return res.send({
			status: 'Commented Successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.getComments = async (req, res) => {
	try {
		const limit = req.query.limit * 1 || 1;
		const page = req.query.page * 1 || 1;
		const postId = req.params.id;
		const data = await postService.getComments(postId, page, limit);
		if (!data) return res.send({ status: 'Comments Not Found' });

		return res.send({
			status: 'Comments Found',
			...data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.getSixPosts = async (req, res) => {
	try {
		const userId = req.params.id;
		let foundPosts = await postService.getSixPosts(userId);
		if (!foundPosts) return res.send({ status: 'Posts Not Found' });
		return res.send({
			status: 'Posts Found',
			posts: foundPosts,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.getPost = async (req, res) => {
	try {
		const postId = req.params.id;
		if (!postId) return res.send({ status: 'ID Not Found' });
		const findPost = await postService.getPost(postId);
		if (!findPost) return res.send({ status: 'Post Not Found' });
		return res.send({
			status: 'Post Retrieved Successfully',
			post: findPost,
		});
	} catch (error) {
		console.log(error);
		res.send({ status: 'Server Error' });
	}
};

module.exports.savePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user._id;
		const findAndUpdate = await postService.savePost(postId, userId);
		if (!findAndUpdate) return res.send({ status: 'Failed To Update' });
		return res.send({
			status: 'Post Saved Successfully',
		});
	} catch (error) {
		console.log(error);
		res.send({ status: 'Server Error' });
	}
};

module.exports.unSavePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user._id;
		const findAndUpdate = await postService.unSavePost(postId, userId);
		if (!findAndUpdate) return res.send({ status: 'Failed To Update' });
		return res.send({
			status: 'Post Unsaved Successfully',
		});
	} catch (error) {
		console.log(error);
		res.send({ status: 'Server Error' });
	}
};

module.exports.deletePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user._id;
		const email = req.user.email;
		const getPost = await postService.getPost(postId);
		if (JSON.stringify(getPost.postBy._id) !== JSON.stringify(userId))
			return res.send({ status: 'Unauthorized' });
		if (getPost.imageUrls && getPost.imageUrls.length > 0) {
			getPost.imageUrls.forEach(async (item) => {
				const urlId = item.split('/').slice(-1)[0].split('.')[0];
				await cloudinary.uploader.destroy(
					`linked-in/${email}/post-pics/${urlId}`
				);
			});
		}
		const deletePost = await postService.deletePost(postId, userId);
		if (!deletePost) return res.send({ status: 'Failed To Delete' });
		return res.send({
			status: 'Post Deleted Successfully',
		});
	} catch (error) {
		console.log(error);
		res.send({ status: 'Server Error' });
	}
};

module.exports.editPost = async (req, res) => {
	try {
		const { caption, imagesToRemove } = req.body;
		const images = req.files.map((item) => item.path);
		const postId = req.params.id;
		const email = req.user.email;
		const getPost = await postService.getPost(postId);
		if (!getPost) return res.send({ status: 'Post Not Found' });
		getPost.caption = caption;
		if (imagesToRemove && imagesToRemove.length > 0) {
			getPost.imageUrls = getPost.imageUrls.filter(
				(item) => !imagesToRemove.includes(item)
			);
			for (const url of imagesToRemove) {
				const urlId = url.split('/').slice(-1)[0].split('.')[0];
				await cloudinary.uploader.destroy(
					`linked-in/${email}/post-pics/${urlId}`
				);
			}
		}

		if (images.length > 0) {
			getPost.imageUrls = [...getPost.imageUrls, ...images];
		}
		const updatePost = await postService.updatePost(getPost, postId);
		return res.send({
			status: 'Post Updated Successfully',
			post: updatePost,
		});
	} catch (error) {
		console.log(error);
		res.send({ status: 'Server Error' });
	}
};

module.exports.createArticle = async (req, res) => {
	try {
		const { caption, articleContent, mentions, title } = req.body;
		const userId = req.user._id;

		const createdArticle = await postService.createArticle(
			{
				postBy: userId,
				caption,
				articleContent,
				mentions,
				isArticle: true,
				title,
			},
			userId
		);

		if (!createdArticle) return res.send({ status: 'Failed' });
		return res.send({
			status: 'Article Created Successfully',
			article: createdArticle,
		});
	} catch (error) {
		console.log(error);
		res.send({ status: 'Server Error' });
	}
};

module.exports.editArticle = async (req, res) => {
	try {
		const postId = req.params.id;
		if (!postId) return res.send({ status: 'Post Not Found' });
		const updateArticle = await postService.updateArticle(req.body, postId);
		if (!updateArticle) return res.send({ status: 'Failed To Update' });

		return res.send({
			status: 'Article Updated Successfully',
			article: updateArticle,
		});
	} catch (error) {
		console.log(error);
		res.send({ status: 'Server Error' });
	}
};
