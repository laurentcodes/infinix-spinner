const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
		console.log('MongoDB connected');
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
