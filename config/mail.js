const nodemailer = require('nodemailer');

const config = {
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: true,
	auth: {
		user: process.env.MAIL_SEND_EMAIL,
		pass: process.env.MAIL_SEND_PASSWORD,
	},
};

export const send = async (data) => {
	const transporter = nodemailer.createTransport(config);

	await new Promise((resolve, reject) => {
		// Verify connection configuration
		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log('Server is ready to take our messages');
				resolve(success);
			}
		});
	});

	await new Promise((resolve, reject) => {
		// send mail
		transporter.sendMail(data, (err, info) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(info);
				resolve(info);
			}
		});
	});

	res.status(200).json({ status: 'OK' });
};
