const Job = require('../models/job.model');

module.exports.createJob = async (data) => {
	try {
		const createdJob = await Job.create(data);
		return createdJob;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getJobs = async (limit, page) => {
	try {
		const skipDocs = (page - 1) * limit;
		const jobsCount = await Job.countDocuments();
		const foundJobs = await Job.find()
			.populate('jobBy', 'userName firstName lastName profilePic email')
			.limit(limit)
			.skip(skipDocs);
		return {
			page,
			totalPages: Math.ceil(jobsCount / limit),
			jobs: foundJobs,
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports.searchJobs = async (searchQurey) => {
	try {
		const foundJobs = await Job.find({
			$or: [
				{ title: { $regex: searchQurey, $options: 'i' } },
				{ 'company.companyName': { $regex: searchQurey, $options: 'i' } },
				{ country: { $regex: searchQurey, $options: 'i' } },
				{ region: { $regex: searchQurey, $options: 'i' } },
			],
		}).populate('jobBy', 'userName firstName lastName profilePic email');
		return foundJobs;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getJob = async (jobId) => {
	try {
		const foundJob = await Job.findById(jobId).populate(
			'jobBy',
			'userName firstName lastName profilePic email'
		);
		return foundJob;
	} catch (error) {
		console.log(error);
	}
};

module.exports.updateCount = async (jobId) => {
	try {
		const findAndUpdate = await Job.findByIdAndUpdate(jobId, {
			$inc: { appliedCount: 1 },
		});
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};
