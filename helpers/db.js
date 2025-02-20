const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const MONGO_URI = process.env.MONGO_DB;
exports.mongooseConnection = async () => {
	try {
		await mongoose.connect(MONGO_URI).then((data) => {
			console.log(
				`SuccessFully Connected to the MongoDB ${data.connection.host}`
			);
		});
	} catch (e) {
		console.error('Unable to connect to database:', e);
	}
};
