const User = require('../models/user.model');

module.exports.readByEmail = async (email) => {
	try {
		const foundUser = await User.findOne({ email }).select('+password');
		return foundUser;
	} catch (error) {
		console.log(error);
	}
};

module.exports.readByUsername = async (userName) => {
	try {
		const foundUser = await User.findOne({ userName });
		return foundUser;
	} catch (error) {
		console.log(error);
	}
};

module.exports.addBasicData = async ({ userName, email, password }) => {
	try {
		const addData = await User.create({
			userName,
			email,
			password,
		});
		return addData;
	} catch (error) {
		console.log(error);
	}
};

module.exports.readById = async (id) => {
	try {
		const foundUser = await User.findById(id);
		return foundUser;
	} catch (error) {
		console.log(error);
	}
};

module.exports.updateData = async (id, data) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(id, data, {
			new: true,
		});
		return updatedUser;
	} catch (error) {
		console.error(error);
	}
};

module.exports.relatedSearch = async (search) => {
	try {
		const foundUsers = await User.find({
			userName: { $regex: search, $options: 'i' },
		});
		return foundUsers;
	} catch (error) {
		console.error(error);
	}
};

module.exports.updateForgetItems = async (email, data) => {
	try {
		const findAndUpdate = await User.updateOne({ email }, data);
		return findAndUpdate;
	} catch (error) {
		console.log(error);
	}
};
