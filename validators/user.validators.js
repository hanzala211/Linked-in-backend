const Joi = require('joi');

module.exports.sign_up_validator = Joi.object({
	email: Joi.string().email().required().messages({
		'string.base': 'Email is not Valid',
		'string.empty': 'Email can not be empty',
	}),
	userName: Joi.string()
		.required()
		.pattern(/^(?!\d+$)[a-z0-9_-]{3,30}$/)
		.messages({
			'string.pattern.base':
				'Username must contain lowercase letters and can include numbers, underscores, or hyphens, but cannot consist of only numbers. It must be 3-30 characters long.',
			'string.pattern.empty': 'Username can not be empty',
		}),
	password: Joi.string().required().min(7),
});

module.exports.log_in_validator = Joi.object({
	email: Joi.string().email().required().messages({
		'string.base': 'Email is not Valid',
		'string.empty': 'Email can not be empty',
	}),
	password: Joi.string().min(7).required(),
});
