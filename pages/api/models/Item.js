const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: false,
	},
	totalCount: {
		type: Number,
		required: false,
	},
	weight: {
		type: Number,
		required: true,
	},
	src: {
		type: String,
		required: true,
	},
	max: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.models.item || mongoose.model('item', ItemSchema);
