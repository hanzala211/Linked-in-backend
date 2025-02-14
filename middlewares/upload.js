const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configs/cloudinary');

module.exports = {
	postImageUpload: multer({
		storage: new CloudinaryStorage({
			cloudinary,
			params: async (req, file) => {
				const userEmail = req.user.email;
				return {
					folder: `linked-in/${userEmail}/post-pics`,
					allowed_formats: ['jpg', 'jpeg', 'png'],
					transformation: [
						{ width: 'auto', height: '300', dpr: 'auto', crop: 'fill' },
					],
				};
			},
		}),
	}),
	postProfilePic: multer({
		storage: new CloudinaryStorage({
			cloudinary,
			params: async (req, file) => {
				const userEmail = req.user.email;
				return {
					folder: `linked-in/${userEmail}/profile-pics`,
					allowed_formats: ['jpg', 'jpeg', 'png'],
					transformation: [{ width: '500', height: '500', crop: 'fill' }],
				};
			},
		}),
	}),
	postProfileBanner: multer({
		storage: new CloudinaryStorage({
			cloudinary,
			params: async (req, file) => {
				const userEmail = req.user.email;
				return {
					folder: `linked-in/${userEmail}/banner`,
					allowed_formats: ['jpeg', 'jpg', 'png'],
					transformation: [{ width: '1584', height: '396', crop: 'fill' }],
				};
			},
		}),
	}),
	uploadPDF: multer({
		storage: new CloudinaryStorage({
			cloudinary,
			params: async (req, file) => ({
				folder: `linked-in/${req.user.email}/pdf`,
				resource_type: 'raw',
				public_id: file.originalname,
			}),
		}),
	}),
};
