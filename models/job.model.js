const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		jobContent: {
			type: String,
			required: true,
		},
		employmentType: {
			type: String,
			required: true,
		},
		industry: {
			type: String,
			required: true,
		},
		appliedCount: {
			type: Number,
			default: 0,
		},
		region: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		jobBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		company: {
			companyName: {
				type: String,
				required: true,
			},
			companyImg: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
