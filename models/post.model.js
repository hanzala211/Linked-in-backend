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
		isArticle: {
			type: Boolean,
			default: false,
		},
		articleContent: {
			type: String,
			required: false,
		},
		title: {
			type: String,
			required: false,
		},
		mentions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: false,
			},
		],
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

module.exports = mongoose.model('Post', postSchema);
