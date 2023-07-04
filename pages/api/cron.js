const connectDB = require('../../config/db');

const cron = require('node-cron');

const Item = require('./models/Item');

// Connect database
connectDB();

const handler = async (req, res) => {
	const cronExpression = '*/10 * * * * *'; // Your desired cron expression, adjusted for the time zone
	const timezoneOffset = '-01:00'; // Time zone offset for the desired time zone

	const adjustedCronExpression = `${cronExpression} ${timezoneOffset}`;

	// Define cron job here
	// cron.schedule('0 0 * * *', async () => {
	// 	// Run at 00:00 every day
	// 	console.log('Running myFunction at 00:00 every day.');

	// 	await Item.updateMany({}, { count: 0 });
	// });

	// cron.schedule('*/5 * * * * *', async () => {
	// 	console.log('Running every 5 seconds lau.');

	// 	await Item.updateMany({}, { count: 50, totalCount: 50 });
	// });

	cron.schedule(adjustedCronExpression, async () => {
		console.log('Running every 10 seconds.');

		await Item.updateMany({}, { count: 25, totalCount: 25 });
	});

	// Send a response to the client
	res.status(200).json({
		message: 'Cron job scheduled successfully.',
		status: 200,
		time: new Date().toISOString(),
	});
};

export default handler;
