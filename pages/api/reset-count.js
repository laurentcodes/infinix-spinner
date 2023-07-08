const connectDB = require('../../config/db');

const Item = require('./models/Item');

// Connect database
connectDB();

export default async function handler(req, res) {
	await Item.updateMany({}, { count: 0 });

	res.status(200).json({
		message: 'Cleared Counts',
		status: res.statusCode,
	});
}
