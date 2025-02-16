const Job = require('../models/job.model');
const User = require('../models/user.model');

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
			.populate(
				'jobBy',
				'userName firstName lastName profilePic email headline'
			)
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
		}).populate(
			'jobBy',
			'userName firstName lastName profilePic email headline'
		);
		return foundJobs;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getJob = async (jobId) => {
	try {
		const foundJob = await Job.findById(jobId).populate(
			'jobBy',
			'userName firstName lastName profilePic email headline'
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

module.exports.saveJob = async (userId, jobId) => {
	try {
		const findAndUpdate = await User.findByIdAndUpdate(userId, {
			$push: { jobs: jobId },
		});
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};

module.exports.unSaveJob = async (userId, jobId) => {
	try {
		const findAndUpdate = await User.findByIdAndUpdate(userId, {
			$pull: { jobs: jobId },
		});
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getSavedJobs = async (userId) => {
	try {
		const foundSaves = await User.findById(userId)
			.select('jobs -_id')
			.populate('jobs');
		return foundSaves ? [...foundSaves.jobs] : foundSaves;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getPostedJobs = async (userId) => {
	try {
		const foundJobs = await Job.find({ jobBy: userId });
		return foundJobs;
	} catch (error) {
		console.log(error);
	}
};
