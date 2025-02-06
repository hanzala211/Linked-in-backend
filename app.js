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
app.use(cors());
app.use(
	cors({
		origin: [
			'https://linked-in-clonify.netlify.app',
			'http://localhost:3000',
			'http://68.183.112.7',
			'http://localhost:5173/',
		],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	})
);

app.use('/api/v1', require('./routes/index'));

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});
