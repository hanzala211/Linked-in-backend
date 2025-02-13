const suggestionsService = require('../services/suggestions.service');

module.exports.getRandomUsers = async (req, res) => {
	try {
		const id = req.user._id;
		const limit = req.query.limit;
		const foundUsers = await suggestionsService.getRandomUsers(limit, id);
		if (!foundUsers) return res.send({ status: 'User Not Found' });

		return res.send({
			status: 'Users Found',
			data: foundUsers,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.getIndustrySuggestions = async (req, res) => {
	try {
		const industry = req.user.industry;
		const id = req.user._id;
		const limit = req.query.limit;
		const findSuggestions = await suggestionsService.getSuggestions(
			industry,
			limit,
			id
		);
		if (!findSuggestions)
			return res.send({ status: 'Users Not Found with this suggestions' });

		res.send({
			status: 'Users Found',
			data: findSuggestions,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};
