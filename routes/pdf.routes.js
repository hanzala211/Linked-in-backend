const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf.controller');

router.route('/download-pdf/:id').get(pdfController.downloadPDF);

module.exports = router;
