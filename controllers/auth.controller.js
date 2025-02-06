const authService = require('../services/auth.service');
const userHelpers = require('../helpers/token');

module.exports.signup = async (req, res) => {
	try {
		const { email, userName, password } = req.body;
		const foundByEmail = await authService.readByEmail(email);
		if (foundByEmail)
			return res.send({ status: 'Account with this Email already exists' });
		const foundByUsername = await authService.readByUsername(userName);
		if (foundByUsername)
			return res.send({ status: 'Account with this Username already exists' });
		const generateHashPass = await userHelpers.generateTokenForPassword(
			password
		);
		const addData = await authService.addBasicData({
			userName,
			email,
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
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundByEmail = await authService.readByEmail(email);
		if (!foundByEmail)
			return res.send({ status: 'Account with this Email does not exist.' });
		const isCorrectPass = await userHelpers.comparePassword(
			password,
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
		console.log(error);
		res.send({
			status: 'Server Error',
		});
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
