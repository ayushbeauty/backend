const Invoice = require('../models/invoice');
const Customer = require('../models/customer');

exports.addInvoice = ({ body: { name, mobileNumber, services } }, res, next) => {
	Customer.find({ mobileNumber }, (err, doc) => {
		if (doc.length == 1) {
			const invoiceIns = new Invoice({ customerId: doc[0]._id, services });
			invoiceIns
				.save()
				.then((result) => {
					res.json('Done');
				})
				.catch((err) => {
					res.send(err);
				});
		} else {
			const customerIns = new Customer({ name, mobileNumber });
			customerIns.save().then((result) => {
				const invoiceIns = new Invoice({ customerId: result._id, services });
				invoiceIns
					.save()
					.then((result) => {
						res.json('Done');
					})
					.catch((err) => {
						res.send(err);
					});
			});
		}
	}).catch((err) => console.log(err));
};

exports.getInvoices = (req, res, next) => {
	Invoice.find().populate({ path: 'customerId' }).populate({ path: 'services.serviceId' }).exec((err, result) => {
		res.json(result);
	});
};
