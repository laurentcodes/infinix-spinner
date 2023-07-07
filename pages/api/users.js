const connectDB = require('../../config/db');

import { send } from '../../config/mail';

import { CustomError } from './util/customError';

const User = require('./models/User');
const Item = require('./models/Item');
const Code = require('./models/ConfirmationCode');

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
			const item = await Item.findById({ _id: itemWon });
			const { code, _id: codeId } = await Code.findOne({ used: false });

			const htmlContent = `
			<html lang='en'>
				<body>
					<div>
						<p>
						Dear Valued Customer, <br />
						Thanks for Participating in our lucky draw. <br />
						Our Infinix Representative will contact you within 24hrs to redeem your prize. 
						
						<br />
						<br />

						Your Confirmation code is <b>${code}</b>
						
						<br />
						<br />

						<b>Gift WON: ${item.name}</b>

						<br />
						<br />

						Thanks for your Patronage.
						</p>
					</div>
				</body>
			</html>
		`;

			const emailData = {
				from: '"Infinix Promotion" <infinixpromotion@gmail.com>',
				to: email,
				subject: 'Infinix Promotion',
				html: htmlContent,
			};

			if (user) {
				throw new CustomError(
					'Error',
					401,
					'You have already participated in this contest.'
				);
			}

			if (!code) {
				throw new CustomError(
					'Error',
					401,
					'Limit exceeded, thanks for participating.'
				);
			}

			const {
				_id: id,
				count: currentCount,
				totalCount: currentTotalCount,
				totalQty,
				max,
			} = await Item.findById({
				_id: itemWon,
			});

			if (currentTotalCount === totalQty) {
				throw new CustomError(
					'Error',
					400,
					'Limit for this item exceeded, thanks for participating .'
				);
			}

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

			if (item.name !== 'Thank You') {
				send(emailData);

				console.log('send');

				await Code.findByIdAndUpdate(codeId, {
					used: true,
				});
			}

			user = new User({
				name,
				email,
				phone,
				itemWon,
				spin: true,
			});

			await user.save();

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
