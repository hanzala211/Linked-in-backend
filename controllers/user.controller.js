const userService = require('../services/user.service');
const cloudinary = require('cloudinary');

module.exports.editProfile = async (req, res) => {
	try {
		const id = req.user._id;
		const data = req.body;
		const editProfile = await userService.editProfile(data, id);
		if (!editProfile) return res.send({ status: 'Failed' });
		return res.send({
			status: 'Profile Updated Successfully',
			data: editProfile,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
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
	}
};
