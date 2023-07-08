const connectDB = require('../../config/db');

const cron = require('node-cron');

const Item = require('./models/Item');

// Connect database
const connectRes = await connectDB();

export default async function handler(req, res) {
	// if (connectRes.connected === 1) {
	// 	// Define cron job here
	// 	cron.schedule('0 0 * * *', async () => {
	// 		// Run at 00:00 every day
	// 		console.log('Running at 00:00 every day.');

	// 		await Item.updateMany({}, { count: 0 });
	// 	});
	// }
	if (connectRes.connected === 1) {
		// Run at 02:25 every day
		console.log('Running at 02:25 every day.');

		await Item.updateMany({}, { count: 0 });
	}

	// Send a response to the client
	console.log('CRON SCHEDULED');

	res.status(200).json({
		message: 'Cron job scheduled successfully.',
		status: 200,
		time: new Date().toISOString(),
	});
}
