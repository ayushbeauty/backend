const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
	{
		services: [
			{
				serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'service' },
				quantity: {
					type: Number,
					required: true,
					default: 1
				}
			}
		],
		customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
		isPaid: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('invoice', invoiceSchema);
