const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
	{
		title: {
			type: String,
			default: '',
		},
		jobContent: {
			type: String,
			default: '',
		},
		employmentType: {
			type: String,
			default: '',
		},
		industry: {
			type: String,
			default: '',
		},
		appliedCount: {
			type: Number,
			default: 0,
		},
		location: {
			type: String,
			default: '',
		},
		company: {
			companyName: {
				type: String,
				default: '',
			},
			companyImg: {
				type: String,
				default: '',
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
