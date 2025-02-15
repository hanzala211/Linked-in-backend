const mongoose = require('mongoose');
const validator = require('validator');

const userScheema = mongoose.Schema({
	userName: {
		type: String,
		required: [true, 'Username is required.'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required.'],
		unique: true,
		validate: [validator.isEmail, 'Please enter a valid email address.'],
	},
	country: {
		type: String,
		default: '',
	},
	region: {
		type: String,
		default: '',
	},
	industry: {
		type: String,
		default: null,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		select: false,
		minLength: 8,
	},
	headline: {
		type: String,
		default: '--',
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	profilePic: {
		type: String,
		default: null,
	},
	banner: {
		type: String,
		default: null,
	},
	pdfLink: {
		type: String,
	},
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: [],
		},
	],
	resume: {
		type: {
			resumeLink: {
				type: String,
			},
			resumeName: {
				type: String,
			},
		},
		default: null,
	},
	followerCount: {
		type: Number,
		default: 0,
	},
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: [],
		},
	],
	savedPosts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			default: [],
		},
	],
	followingCount: {
		type: Number,
		default: 0,
	},
	experience: {
		type: [
			{
				companyName: {
					type: String,
				},
				companyImg: {
					type: String,
				},
				employmentType: {
					type: String,
				},
				description: {
					type: String,
				},
				startDate: {
					type: String,
				},
				endDate: {
					type: String,
				},
				location: {
					type: String,
				},
			},
		],
		default: [],
	},
	education: {
		type: [
			{
				schoolName: {
					type: String,
				},
				schoolImg: {
					type: String,
				},
				degree: {
					type: String,
				},
				description: {
					type: String,
				},
				startDate: {
					type: String,
				},
				endDate: {
					type: String,
				},
				location: {
					type: String,
				},
				grade: {
					type: String,
				},
			},
		],
		default: [],
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			default: [],
		},
	],
	postsCount: {
		type: Number,
		default: 0,
	},
	jobs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Job',
			default: [],
		},
	],
});

module.exports = mongoose.model('User', userScheema);
