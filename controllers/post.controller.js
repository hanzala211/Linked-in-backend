const postService = require('../services/post.service');

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
		const id = req.user._id;
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
