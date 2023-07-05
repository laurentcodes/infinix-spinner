const connectDB = require('../../config/db');

import { send } from '../../config/mail';

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
			const item = await Item.findById({ _id: itemWon });

			const htmlContent = `
				<html>
					<head>
						<style>
							body {
								font-family: Arial, sans-serif;
								background-color: #f2f2f2;
							}

							.container {
								max-width: 600px;
								margin: 0 auto;
								padding: 20px;
								background-color: #fff;
								border-radius: 5px;
								box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
							}

							.text {
								color: rgb(5 122 85 / 0.9);
							}
						</style>
					</head>

					<body>
						<div class="container">
							<h3>Hello ${name}</h3>
							<p>You have won <span class="text">${item.name}</span></p>
						</div>
					</body>
				</html>`;

			// Email sending
			const emailData = {
				from: '"Segun Olagunju" <stlaurentgod@gmail.com>',
				to: email,
				subject: 'Hello Winner',
				html: htmlContent,
			};

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

			// send(emailData);

			res.status(201).json({
				data: { name, email, itemWon },
				status: res.statusCode,
				message: 'User saved and Email Sent successfully!',
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
