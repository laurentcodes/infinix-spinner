const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const ConfirmationCodeSchema = mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	used: {
		type: Boolean,
		required: false,
	},
});

module.exports =
	mongoose.models.confirmationCode ||
	mongoose.model('confirmationCode', ConfirmationCodeSchema);
