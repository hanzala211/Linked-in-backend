const express = require('express');
const dotenv = require('dotenv');
const { mongooseConnection } = require('./helpers/db');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

dotenv.config();
mongooseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: '*', // Temporary for testing
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		allowedHeaders:
			'Origin, X-Requested-With, Content-Type, Accept, Authorization',
		exposedHeaders: 'Authorization',
	})
);

app.use('/api/v1', require('./routes/index'));

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});
