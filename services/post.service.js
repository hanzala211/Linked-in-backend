const Post = require('../models/post.model');
const User = require('../models/user.model');

module.exports.createPost = async (data, id) => {
	try {
		const createPost = await Post.create(data);
		await User.findByIdAndUpdate(id, {
			$push: { posts: createPost._id },
			$inc: { postsCount: 1 },
		});
		return createPost;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getAllPosts = async (id) => {
	try {
		const allPosts = await Post.find({ postBy: id }).populate({
			path: 'postBy',
			select: 'firstName userName lastName headline profilePic',
		});
		return allPosts;
	} catch (error) {
		console.log(error);
	}
};

module.exports.likePost = async (userId, postId) => {
	try {
		const findAndUpdate = await Post.findByIdAndUpdate(
			postId,
			{
				$push: { likes: userId },
				$inc: { likeCount: 1 },
			},
			{
				new: true,
			}
		);
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};

module.exports.disLikePost = async (userId, postId) => {
	try {
		const findAndUpdate = await Post.findByIdAndUpdate(
			postId,
			{
				$pull: { likes: userId },
				$inc: { likeCount: -1 },
			},
			{
				new: true,
			}
		);
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getFeedPosts = async (userId, limit) => {
	try {
		const findPosts = await Post.aggregate([
			{ $match: { postBy: { $ne: userId } } },
			{ $sample: { size: parseInt(limit, 10) } },
			{
				$lookup: {
					from: 'users',
					foreignField: '_id',
					localField: 'postBy',
					as: 'postBy',
				},
			},
			{ $unwind: '$postBy' },
		]);
		return findPosts;
	} catch (error) {
		console.log(error);
	}
};

module.exports.postComment = async (postId, data) => {
	try {
		const updateComment = await Post.findByIdAndUpdate(postId, {
			$push: { comments: data },
			$inc: { commentCount: 1 },
		});
		return updateComment;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getComments = async (postId, page, limit) => {
	try {
		// const comments = await Post.aggregate([
		// 	{ $match: { _id: postId } },
		// 	{ $project: { comments: { $slice: ['$comments', skipDocs, limit] } } },
		// 	{ $unwind: '$comments' },
		// 	{
		// 		$lookup: {
		// 			from: 'users',
		// 			foreignField: '_id',
		// 			localField: 'comments.user',
		// 			as: 'user',
		// 		},
		// 	},
		// 	{ $unwind: '$comments.user' },
		// 	{
		// 		$group: {
		// 			_id: '$comments._id',
		// 			comments: { $push: '$comments' },
		// 		},
		// 	},
		// ]);

		// const comments = await Post.findById(postId)
		// 	.select({ comments: { $slice: [skipDocs, limit] } }) // Apply pagination on comments array
		// 	.populate({
		// 		path: 'comments.user',
		// 		select: 'firstName lastName profilePic headline',
		// 	})
		// 	.select('comments');

		const posts = await Post.findById(postId)
			.populate({
				path: 'comments.user',
				select: 'firstName lastName profilePic headline',
			})
			.select('comments');

		const commentsCount = posts.comments.length;

		const paginatedComm = posts.comments
			.sort((a, b) => b.createdAt - a.createdAt)
			.slice((page - 1) * limit, page * limit);

		return {
			page: parseInt(page, 10),
			totalPages: Math.ceil(commentsCount / limit),
			comments: paginatedComm,
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports.getSixPosts = async (userId) => {
	try {
		const foundPosts = await Post.find({ postBy: userId })
			.sort({ createdAt: -1 })
			.limit(6)
			.populate({
				path: 'postBy',
				select: 'firstName lastName userName profilePic headline',
			});

		return foundPosts;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getPost = async (postId) => {
	try {
		const findById = await Post.findById(postId).populate({
			path: 'postBy',
			select: 'firstName lastName userName headline profilePic',
		});
		return findById;
	} catch (error) {
		console.log(error);
	}
};

module.exports.savePost = async (postId, userId) => {
	try {
		const findAndUpdate = await User.findByIdAndUpdate(
			userId,
			{
				$push: { savedPosts: postId },
			},
			{
				new: true,
			}
		);
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};

module.exports.unSavePost = async (postId, userId) => {
	try {
		const findAndUpdate = await User.findByIdAndUpdate(
			userId,
			{
				$pull: { savedPosts: postId },
			},
			{
				new: true,
			}
		);
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};

module.exports.deletePost = async (postId, userId) => {
	try {
		const findByIdAndDelete = await Post.findByIdAndDelete(postId);
		const updateUser = await User.findByIdAndUpdate(
			userId,
			{
				$pull: { posts: postId },
				$inc: { postsCount: -1 },
			},
			{
				new: true,
			}
		);
		return findByIdAndDelete;
	} catch (error) {
		console.log(error);
	}
};

module.exports.updatePost = async (data, postId) => {
	try {
		const findAndUpdate = await Post.findByIdAndUpdate(postId, data, {
			new: true,
		}).populate({
			path: 'postBy',
			select: 'firstName lastName userName profilePic banner',
		});
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};
