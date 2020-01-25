const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
	{
		serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'service' },
		quantity: {
			type: Number,
			required: true,
			default: 1
		}
	},
	{ _id: false }
);

const invoiceSchema = new mongoose.Schema({
	services: [ serviceSchema ],
	customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
	isPaid: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('invoice', invoiceSchema);
