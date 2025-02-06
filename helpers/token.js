const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.generateTokenForPassword = async (password) => {
	const generatedToken = await bcrypt.hash(password, 10);
	return generatedToken;
};

module.exports.generateToken = (user) => {
	const token =
		'Bearer ' +
		jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE_TIME,
		});
	return token;
};

module.exports.comparePassword = async (candidatePassword, userPassword) => {
	try {
		const isCorrectPass = await bcrypt.compare(candidatePassword, userPassword);
		return isCorrectPass;
	} catch (error) {
		console.log(error);
	}
};
