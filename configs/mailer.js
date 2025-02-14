const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.GMAIL,
		pass: process.env.GMAIL_PASS,
	},
});

module.exports = transporter;
