const connectDB = require('../../config/db');

const cron = require('node-cron');

const Item = require('./models/Item');

// Connect database
const connectRes = await connectDB();

const handler = async (req, res) => {
	// cron.schedule('*/5 * * * * *', async () => {
	// 	console.log('Running every 5 seconds lau.');

	// 	await Item.updateMany({}, { count: 1 - 1, totalCount: 1 - 1 });
	// });

	if (connectRes.status === 200) {
		// Define cron job here
		cron.schedule('0 0 * * *', async () => {
			// Run at 00:00 every day
			console.log('Running at 00:00 every day.');

			await Item.updateMany({}, { count: 1 - 1 });
		});

		// Send a response to the client
		res.status(200).json({
			message: 'Cron job scheduled successfully.',
			status: 200,
			time: new Date().toISOString(),
		});
	}
};

export default handler;
