const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const authService = require('../services/auth.service');

module.exports.downloadPDF = async (req, res) => {
	try {
		const id = req.params.id;
		const findUser = await authService.readById(id);
		const pdfPath = path.join(__dirname, 'Resume.pdf');
		const doc = new PDFDocument({ size: 'A4', margin: 50 });
		const stream = fs.createWriteStream(pdfPath);

		doc.pipe(stream);

		// Styles
		const headingFontSize = 20;
		const subheadingFontSize = 14;
		const bodyFontSize = 12;

		// Title
		doc
			.font('Helvetica-Bold')
			.fontSize(headingFontSize)
			.text(`${findUser.firstName} ${findUser.lastName}`, { align: 'left' });
		doc
			.fontSize(subheadingFontSize)
			.fillColor('blue')
			.text(findUser.headline.split(' ').slice(0, 7).join(' '));
		doc.fillColor('black').text(`${findUser.region}, ${findUser.country}`);

		doc.moveDown();

		// Summary
		doc.fontSize(subheadingFontSize).font('Helvetica-Bold').text('Summary');
		doc.fontSize(bodyFontSize).font('Helvetica').text(findUser.headline);

		doc.moveDown();

		// Experience
		if (findUser.experience.length > 0) {
			doc
				.fontSize(subheadingFontSize)
				.font('Helvetica-Bold')
				.text('Experience');
			doc.moveDown(0.5);

			findUser.experience.forEach((exp) => {
				doc.font('Helvetica-Bold').text(exp.companyName);
				doc.font('Helvetica').text(exp.employmentType);
				doc.fontSize(bodyFontSize).text(`${exp.startDate} - ${exp.endDate}`);
				doc.moveDown();
			});
		}
		// Education
		if (findUser.education.length > 0) {
			doc.fontSize(subheadingFontSize).font('Helvetica-Bold').text('Education');
			doc.moveDown(0.5);
			findUser.education.forEach((edu) => {
				doc.font('Helvetica-Bold').text(edu.schoolName);
				doc.font('Helvetica').text(edu.degree);
				doc.fontSize(bodyFontSize).text(`${edu.startDate} - ${edu.endDate}`);
				doc.moveDown();
			});
		}
		doc.end();

		stream.on('finish', () => {
			res.setHeader('Content-Disposition', 'attachement; filename=Resume.pdf');
			res.setHeader('Content-Type', 'application/pdf');
			const fileStream = fs.createReadStream(pdfPath);
			fileStream.pipe(res);
			fileStream.on('end', () => {
				fs.unlink(pdfPath, (err) => {
					if (err) console.error('Error deleting file:', err);
				});
			});
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'Server Error',
		});
	}
};
