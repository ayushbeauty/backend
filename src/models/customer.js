const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		mobileNumber: {
			type: Number,
			required: true
		}
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('customer', customerSchema);
