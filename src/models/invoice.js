const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
	services: [ { type: mongoose.Schema.Types.ObjectId, ref: 'service' } ],
	customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true }
});

module.exports = mongoose.model('invoice', invoiceSchema);
