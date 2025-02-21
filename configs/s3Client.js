const { S3Client } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
	},
});

module.exports = { s3Client };
