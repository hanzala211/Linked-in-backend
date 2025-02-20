const authService = require('../services/auth.service');
const userHelpers = require('../helpers/token');
const JoiScheema = require('../validation/user.schema');
const crypto = require('crypto');
const transporter = require('../configs/mailer');

module.exports.signup = async (req, res) => {
	try {
		const { email, userName } = req.body;
		const result = await JoiScheema.sign_up_validator.validateAsync(req.body);
		const foundByEmail = await authService.readByEmail(email);
		if (foundByEmail)
			return res.send({ status: 'Account with this Email already exists' });
		const foundByUsername = await authService.readByUsername(userName);
		if (foundByUsername)
			return res.send({ status: 'Account with this Username already exists' });
		const generateHashPass = await userHelpers.generateTokenForPassword(
			result.password
		);
		const addData = await authService.addBasicData({
			userName: result.userName,
			email: result.email,
			password: generateHashPass,
		});
		if (addData) {
			const token = userHelpers.generateToken(addData);
			return res.send({
				status: 'Success',
				token,
				user: addData,
			});
		}
		return res.send({
			status: 'Fail',
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

module.exports.login = async (req, res) => {
	try {
		const result = await JoiScheema.log_in_validator.validateAsync(req.body);
		const foundByEmail = await authService.readByEmail(result.email);
		if (!foundByEmail)
			return res.send({ status: 'Account with this Email does not exist.' });
		const isCorrectPass = await userHelpers.comparePassword(
			result.password,
			foundByEmail.password
		);
		if (!isCorrectPass) return res.send({ status: 'Password is Incorrect.' });
		const token = userHelpers.generateToken(foundByEmail);
		const { password: _, ...restData } = foundByEmail.toObject();
		return res.send({
			status: 'Success',
			user: restData,
			token,
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

module.exports.me = async (req, res) => {
	try {
		const user = req.user;
		return res.send({
			status: 'Success',
			user,
		});
	} catch (error) {
		console.error(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.updateName = async (req, res) => {
	try {
		const user = req.user;
		const { firstName, lastName } = req.body;
		const updatedData = await authService.updateData(user._id, {
			firstName,
			lastName,
		});
		if (updatedData) {
			return res.send({
				status: 'Success',
				user: updatedData,
			});
		}
		return res.send({
			status: 'Fail',
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.searchUser = async (req, res) => {
	try {
		const search = req.query.search;
		const foundUsers = await authService.relatedSearch(search);
		if (!foundUsers) {
			return res.send({
				status: 'User with this Username not Found',
			});
		}
		return res.send({
			status: 'Success',
			data: foundUsers,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.forgetPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const readByEmail = await authService.readByEmail(email);
		if (!readByEmail)
			return res.send({ status: 'User Not Found with this Email' });
		const code = crypto.randomBytes(3).toString('hex');
		const timeForExpiry = Date.now() + 60 * 60 * 1000;
		const updateForgotPass = await authService.updateForgetItems(email, {
			forgotPasswordCode: code,
			forgotPasswordTime: timeForExpiry,
		});
		await transporter.sendMail({
			to: email,
			subject: 'Password Rest Code',
			text: `Your Password Reset Code is ${code}`,
		});
		return res.send({
			status: 'Code Send Successfully',
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.resetPassword = async (req, res) => {
	try {
		const { code, resetPass, email } = req.body;
		const readByEmail = await authService.readByEmail(email);
		if (Date.now() > readByEmail.forgotPasswordTime)
			return res.send({ status: 'Code has Expired' });
		if (code !== readByEmail.forgotPasswordCode)
			return res.send({ status: 'Code is Not Valid' });
		const hashedPassword = await userHelpers.generateTokenForPassword(
			resetPass
		);
		const updateThePass = await authService.updateForgetItems(email, {
			password: hashedPassword,
		});
		return res.send({ status: 'Password Updated Successfully' });
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};
