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

	// Verify connection configuration
	transporter.verify((error, success) => {
		if (error) {
			console.log(error.message);
		} else {
			console.log('Server is ready to take our messages');
		}
	});

	await transporter.sendMail(data, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			return info.response;
		}
	});
};
