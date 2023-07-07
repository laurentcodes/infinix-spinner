const connectDB = require('../../config/db');

import { CustomError } from './util/customError';

const Code = require('./models/ConfirmationCode');

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { code } = req.body;

	if (method === 'GET') {
		try {
			let codes = await Code.find();
			const count = await Code.countDocuments();

			res.status(200).json({ data: codes, total: count });
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else if (method === 'POST') {
		try {
			let confirmationCode = await Code.findOne({ code });

			if (confirmationCode) {
				throw new CustomError('Error', 401, 'Code already exists');
			}

			confirmationCode = new Code({
				code,
				used: false,
			});

			await confirmationCode.save();

			res.status(201).json({
				data: { code, used: false },
				status: res.statusCode,
			});
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else {
		res.status(405).send({ message: 'Invalid' });
	}
};

export default handler;
