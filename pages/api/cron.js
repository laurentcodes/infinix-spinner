const connectDB = require('../../config/db');

const Item = require('./models/Item');

// Connect database
await connectDB();

const handler = (req, res) => {
	// Run at 00:00 every day
	console.log('Running at 02:46 every day.');

	Item.updateMany({}, { count: 0 });

	res.status(200).json({
		message: 'Cron job scheduled successfully.',
		status: 200,
		time: new Date().toISOString(),
	});
};

export default handler;
