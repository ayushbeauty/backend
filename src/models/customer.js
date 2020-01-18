const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	name: {
		type: String
	},
	mobileNumber: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('customer', customerSchema);
