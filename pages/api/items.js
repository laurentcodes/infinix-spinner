const connectDB = require('../../config/db');

import { CustomError } from './util/customError';

const Item = require('./models/Item');

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { name, count, max, weight, src } = req.body;

	if (method === 'GET') {
		try {
			let items = await Item.find();
			const count = await Item.countDocuments();

			res.status(200).json({ data: items, total: count });
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else if (method === 'POST') {
		try {
			let item = await Item.findOne({ name });

			if (item) {
				throw new CustomError('Error', 401, 'Item already exists');
			}

			item = new Item({
				name,
				count: 0,
				totalCount: 0,
				weight,
				max,
				src,
			});

			await item.save();

			res.status(201).json({
				data: { name, count, max, src, weight },
				status: res.statusCode,
			});
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else if (method === 'PUT') {
		await Item.updateMany({}, { count: 0 });

		res.status(200).json({
			data: { message: 'Cleared Counts' },
			status: res.statusCode,
		});
	} else {
		res.status(405).send({ message: 'Invalid' });
	}
};

export default handler;
