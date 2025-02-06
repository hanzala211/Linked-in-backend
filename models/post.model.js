const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		caption: {
			type: String,
			default: '',
		},
		postBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		imageUrls: [
			{
				type: String,
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		likeCount: {
			type: Number,
			default: 0,
		},
		commentCount: {
			type: Number,
			default: 0,
		},
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				comment: {
					type: String,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
