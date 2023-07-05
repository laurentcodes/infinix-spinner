const mongoose = require('mongoose');

const connection = {};

const connectDB = async () => {
	if (connection.isConnected) return;

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		connection.isConnected = db.connections[0].readyState;

		console.log('MongoDB connected');

		return {
			message: 'MongoDB Connected',
			status: 200,
		};
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
