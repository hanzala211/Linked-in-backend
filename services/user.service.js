const User = require('../models/user.model');

module.exports.editProfile = async (data, id) => {
	try {
		const editProfile = await User.findByIdAndUpdate(id, data, {
			new: true,
		});
		return editProfile;
	} catch (error) {
		console.log(error);
	}
};

module.exports.updateProfilePic = async (image, id) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				profilePic: image,
			},
			{
				new: true,
			}
		);
		return updatedUser;
	} catch (error) {
		console.log(error);
	}
};

module.exports.updateProfileBanner = async (image, id) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				banner: image,
			},
			{
				new: true,
			}
		);
		return updatedUser;
	} catch (error) {
		console.log(error);
	}
};

module.exports.removeProfilePic = async (id) => {
	try {
		const removedProfile = await User.findByIdAndUpdate(
			id,
			{
				profilePic: null,
			},
			{
				new: true,
			}
		);
		return removedProfile;
	} catch (error) {
		console.log(error);
	}
};

module.exports.removeBanner = async (id) => {
	try {
		const removedProfile = await User.findByIdAndUpdate(
			id,
			{
				banner: null,
			},
			{
				new: true,
			}
		);
		return removedProfile;
	} catch (error) {
		console.log(error);
	}
};

module.exports.followUser = async (followedId, userId) => {
	try {
		const updateMyUser = await User.findByIdAndUpdate(userId, {
			$push: { following: followedId },
			$inc: { followingCount: 1 },
		});
		await User.findByIdAndUpdate(followedId, {
			$push: { followers: userId },
			$inc: { followerCount: 1 },
		});
		return updateMyUser;
	} catch (error) {
		console.log(error);
	}
};

module.exports.unFollowUser = async (followedId, userId) => {
	try {
		const updateMyUser = await User.findByIdAndUpdate(userId, {
			$pull: { following: followedId },
			$inc: { followingCount: -1 },
		});
		await User.findByIdAndUpdate(followedId, {
			$pull: { followers: userId },
			$inc: { followerCount: -1 },
		});
		return updateMyUser;
	} catch (error) {
		console.log(error);
	}
};

module.exports.getFollow = async (userId) => {
	try {
		const foundUser = await User.findById(userId)
			.select('followers following -_id')
			.populate(
				'followers following',
				'userName firstName profilePic lastName headline'
			);
		if (foundUser) {
			const allUsers = [...foundUser.followers, ...foundUser.following];

			const uniqueUsers = allUsers.filter(
				(item, index, arr) =>
					index ===
					arr.findIndex((other) => other._id.toString() === item._id.toString())
			);
			return uniqueUsers;
		}
		return foundUser;
	} catch (error) {
		console.log(error);
	}
};
