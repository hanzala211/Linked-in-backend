const User = require('../models/user.model');

module.exports.getRandomUsers = async (limit, id) => {
	try {
		const findUsers = await User.aggregate([
			{ $match: { _id: { $ne: id } } },
			{ $sample: { size: parseInt(limit, 10) } },
		]);
		return findUsers;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getSuggestions = async (industry, limit, id) => {
	try {
		const foundUsers = await User.aggregate([
			{
				$match: {
					_id: { $ne: id },
					industry: industry,
				},
			},
			{ $sample: { size: parseInt(limit, 10) } },
		]);
		return foundUsers;
	} catch (error) {
		console.log(error);
	}
};
