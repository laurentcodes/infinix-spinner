const connectDB = require('../../config/db');

import { CustomError } from './util/customError';

const User = require('./models/User');
const Item = require('./models/Item');

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { name, email, phone, itemWon } = req.body;

	if (method === 'GET') {
		try {
			const count = await User.countDocuments();

			let users = await User.aggregate([
				{
					$lookup: {
						from: 'items',
						localField: 'itemWon',
						foreignField: '_id',
						as: 'itemWon',
					},
				},
				{ $unwind: '$itemWon' },
				{
					$project: {
						_id: 1,
						name: 1,
						email: 1,
						phone: 1,
						spin: 1,
						'itemWon._id': 1,
						'itemWon.name': 1,
						date: 1,
					},
				},
			]).exec();

			res.status(200).json({ data: users, total: count });
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else if (method === 'POST') {
		try {
			let user = await User.findOne({ email });

			if (user) {
				throw new CustomError(
					'Error',
					401,
					'You have already participated in this contest.'
				);
			}

			const {
				_id: id,
				count: currentCount,
				totalCount: currentTotalCount,
				max,
			} = await Item.findById({
				_id: itemWon,
			});

			if (currentCount === max) {
				throw new CustomError(
					'Error',
					400,
					'Limit for this item exceeded today, please try again tomorrow.'
				);
			}

			await Item.findByIdAndUpdate(id, {
				count: currentCount + 1,
				totalCount: currentTotalCount + 1,
			});

			user = new User({
				name,
				email,
				phone,
				itemWon,
				spin: true,
			});

			await user.save();

			res
				.status(201)
				.json({ data: { name, email, itemWon }, status: res.statusCode });
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
