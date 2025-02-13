const Joi = require('joi');

module.exports.create_job_post = Joi.object({
	title: Joi.string().required().messages({
		'string.base': 'Title is Required',
		'string.empty': 'Title Can not be empty',
	}),
	employmentType: Joi.string().required().messages({
		'any.required': 'Work Type is Required',
	}),
	country: Joi.string().required().messages({
		'any.required': 'Country is Required',
	}),
	region: Joi.string(),
	jobContent: Joi.string().required().messages({
		'any.required': "Job Description Can't be empty",
	}),
	industry: Joi.string().required().messages({
		'any.required': 'Industry is Required',
	}),
	company: Joi.object({
		companyName: Joi.string().required().messages({
			'any.required': 'Company Name is Required',
			'string.empty': 'Company Name cannot be empty',
		}),
		companyImg: Joi.any().optional().messages({
			'string.empty': "Company Image can't be empty",
		}),
	})
		.required()
		.messages({
			'any.required': 'Company details are required',
		}),
});
