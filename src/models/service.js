const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true
		},
		description: {
			type: String
		},
		amount: {
			type: Number,
			required: true
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'category',
			required: true
		}
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('service', serviceSchema);
