const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	itemWon: {
		type: ObjectId,
		ref: 'items',
		required: true,
	},
	spin: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.models.user || mongoose.model('user', UserSchema);
