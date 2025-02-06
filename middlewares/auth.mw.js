const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

module.exports.ensureAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) return res.send({ staus: 'Unauthorized' });
		const decode = jwt.verify(
			token.replace('Bearer ', ''),
			process.env.JWT_SECRET_KEY
		);
		const user = await authService.readById(decode.id);
		if (!user) return res.send({ staus: 'Unauthorized' });
		req.user = user;
		return next();
	} catch (error) {
		console.log(error);
	}
};
