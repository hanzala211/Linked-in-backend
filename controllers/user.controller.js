const userService = require('../services/user.service');
const cloudinary = require('cloudinary');

module.exports.editProfile = async (req, res) => {
	try {
		const id = req.user._id;
		const data = req.body;
		const { educations, experience } = data;

		const isValidDateRange = (startDate, endDate) => {
			if (!startDate) return false;
			if (endDate === 'Present') return true;
			if (!endDate) return false;
			return new Date(endDate) >= new Date(startDate);
		};

		let isInvalid = false;
		educations?.forEach((item) => {
			if (!isValidDateRange(item.startDate, item.endDate)) {
				isInvalid = true;
			}
		});
		experience?.forEach((item) => {
			if (!isValidDateRange(item.startDate, item.endDate)) {
				isInvalid = true;
			}
		});
		if (isInvalid) {
			return res.json({
				status: 'Error',
				message: 'End Date cannot be less than Start Date',
			});
		}
		const editProfile = await userService.editProfile(data, id);
		if (!editProfile) return res.status(500).json({ status: 'Failed' });

		return res.json({
			status: 'Profile Updated Successfully',
			data: editProfile,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ status: 'Server Error' });
	}
};

module.exports.updateProfilePic = async (req, res) => {
	try {
		const id = req.user._id;
		const file = req.file;

		const updatedPic = await userService.updateProfilePic(file.path, id);
		if (!updatedPic) return res.send({ status: 'Failed' });
		return res.send({
			status: 'Profile Picture Updated Successfully',
			updatedPic,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.updateProfileBanner = async (req, res) => {
	try {
		const id = req.user._id;
		const file = req.file;

		const updatedPic = await userService.updateProfileBanner(file.path, id);
		if (!updatedPic) return res.send({ status: 'Failed' });
		return res.send({
			status: 'Profile Banner Updated Successfully',
			updatedPic,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.removeProfilePic = async (req, res) => {
	try {
		const id = req.user._id;
		const email = req.user.email;
		const profile = req.user.profilePic;
		if (!profile) return res.send({ status: 'Profile Picture Not Found' });
		const urlId = profile.split('/').slice(-1)[0].split('.')[0];
		await cloudinary.uploader.destroy(
			`linked-in/${email}/profile-pics/${urlId}`
		);
		const removeProfile = await userService.removeProfilePic(id);
		if (!removeProfile)
			return res.send({ status: 'Failed to Remove Profile Picture' });
		return res.send({
			status: 'Profile Picture Removed Successfully',
			data: removeProfile,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.removeBanner = async (req, res) => {
	try {
		const id = req.user._id;
		const email = req.user.email;
		const banner = req.user.banner;
		if (!banner) return res.send({ status: 'Banner Not Found' });
		const urlId = banner.split('/').slice(-1)[0].split('.')[0];
		await cloudinary.uploader.destroy(`linked-in/${email}/banner/${urlId}`);
		const removeProfile = await userService.removeBanner(id);
		if (!removeProfile) return res.send({ status: 'Failed to Remove Banner' });
		return res.send({
			status: 'Banner Removed Successfully',
			data: removeProfile,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.followUser = async (req, res) => {
	try {
		const userId = req.user._id;
		const followedId = req.params.id;
		const updateFollow = await userService.followUser(followedId, userId);
		if (!updateFollow) return res.send({ status: 'Can not Follow the User' });

		return res.send({
			status: 'User Followed Successfully',
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};

module.exports.unFollowUser = async (req, res) => {
	try {
		const userId = req.user._id;
		const followedId = req.params.id;
		const updateFollow = await userService.unFollowUser(followedId, userId);
		if (!updateFollow) return res.send({ status: 'Can not Follow the User' });

		return res.send({
			status: 'User Unfollowed Successfully',
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};
