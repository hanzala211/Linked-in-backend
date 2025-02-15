const JoiSchema = require('../validation/job.schema');
const jobService = require('../services/job.service');
const transporter = require('../configs/mailer');
const generateEmailTemplate = require('../helpers/emailTemplate');
const userService = require('../services/user.service');

module.exports.createJob = async (req, res) => {
	try {
		const userId = req.user._id;
		const dataResult = await JoiSchema.create_job_post.validateAsync(req.body);
		const createdJob = await jobService.createJob({
			jobBy: userId,
			...dataResult,
		});
		if (!createdJob) return res.send({ status: 'Failed To Create' });

		return res.send({
			status: 'Job Created Successfully',
			job: createdJob,
		});
	} catch (error) {
		if (error.isJoi) {
			return res.status(400).json({
				status: 'Validation Error',
				errors: error.details.map((err) => err.message),
			});
		}
		console.error(error);
		return res.status(500).json({ status: 'Server Error' });
	}
};

module.exports.getJobs = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 10;
		const page = parseInt(req.query.page) || 1;
		const foundJobs = await jobService.getJobs(limit, page);
		if (!foundJobs) return res.send({ status: 'Failed To Found' });

		return res.send({ status: 'Jobs Found', ...foundJobs });
	} catch (error) {
		console.log(error);
		return res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.searchJobs = async (req, res) => {
	try {
		const searchQurey = req.query.search;
		const foundJobs = await jobService.searchJobs(searchQurey);
		if (!foundJobs) return res.send({ status: 'Jobs Not Found' });
		return res.send({
			status: 'Jobs Found',
			data: foundJobs,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.getJob = async (req, res) => {
	try {
		const jobId = req.params.id;
		const foundJob = await jobService.getJob(jobId);
		if (!foundJob) return res.send({ status: 'Job Not Found' });
		return res.send({
			status: 'Job Found',
			job: foundJob,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.applyToJob = async (req, res) => {
	try {
		const resumePDF = req.file && req.file.path;
		const jobId = req.params.id;
		const { recieverEmail, number, email, title } = req.body;
		const { firstName, lastName, _id, resume } = req.user;

		const generatedTemplate = generateEmailTemplate({
			firstName,
			lastName,
			email,
			phone: number,
			link: resumePDF || resume.resumeLink,
			title,
		});

		await transporter.sendMail({
			to: recieverEmail,
			subject: 'Applied User',
			html: generatedTemplate,
		});

		if (req.file) {
			await userService.uploadPdfToUser(
				{
					resumeLink: resumePDF,
					resumeName: req.file.originalname,
				},
				_id
			);
		}
		await jobService.updateCount(jobId);
		return res.send({
			status: 'Applied Successfully',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.saveJob = async (req, res) => {
	try {
		const jobId = req.params.id;
		const userId = req.user._id;
		await jobService.saveJob(userId, jobId);

		return res.send({
			status: 'Job Saved Successfully',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ status: 'Server Error' });
	}
};

module.exports.unSaveJob = async (req, res) => {
	try {
		const jobId = req.params.id;
		const userId = req.user._id;
		await jobService.unSaveJob(userId, jobId);

		return res.send({
			status: 'Job Unsaved Successfully',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ status: 'Server Error' });
	}
};
