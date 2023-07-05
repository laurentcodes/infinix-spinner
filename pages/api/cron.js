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

	// Define cron job here
	// cron.schedule('0 0 * * *', async () => {
	// 	// Run at 00:00 every day
	// 	console.log('Running at 00:00 every day.');

	// 	await Item.updateMany({}, { count: 1 - 1 });
	// });

	// cron.schedule('0 0 */23 * *', async () => {
	// 	// Run every 23 hours
	// 	console.log('Running every 23 hours.');

	// 	await Item.updateMany({}, { count: 15, totalCount: 24 });
	// });

	if (connectRes.connected === 1) {
		cron.schedule('*/5 * * * * *', async () => {
			console.log('Running every 5 seconds lau.');

			await Item.updateMany({}, { count: 23, totalCount: 23 });
		});
	}

	// Send a response to the client
	res.status(200).json({
		message: 'Cron job scheduled successfully.',
		status: 200,
		time: new Date().toISOString(),
	});
};

export default handler;
