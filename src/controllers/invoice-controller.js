const Invoice = require('../models/invoice');
const Customer = require('../models/customer');
const moment = require('moment');

const _ = require('lodash');

exports.addInvoice = ({ body: { name, mobileNumber, services } }, res, next) => {
	// Checks if the user is already exists
	Customer.find({ mobileNumber }, (err, doc) => {
		if (doc.length == 1) {
			const invoiceIns = new Invoice({ customerId: doc[0]._id, services });
			invoiceIns
				.save()
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					res.send(err);
				});
		} else {
			name = name.charAt(0).toUpperCase() + name.slice(1);
			const customerIns = new Customer({ name, mobileNumber });
			customerIns.save().then((result) => {
				const invoiceIns = new Invoice({ customerId: result._id, services });
				invoiceIns
					.save()
					.then((result) => {
						res.json(result);
					})
					.catch((err) => {
						res.send(err);
					});
			});
		}
	}).catch((err) => console.log(err));
};

exports.getInvoice = (req, res, next) => {
	let { id } = req.params;
	Invoice.find({ _id: id })
		.populate({ path: 'customerId' })
		.populate({
			path: 'services.serviceId',
			model: 'service',
			populate: {
				path: 'category',
				model: 'category'
			}
		})
		.exec((err, result) => {
			let invoice = result[0];
			res.json({ ...invoice._doc, total: getTotal(result) });
		});
};

exports.getInvoices = (req, res, next) => {
	Invoice.find()
		.populate({ path: 'customerId' })
		.populate({
			path: 'services.serviceId',
			model: 'service',
			populate: {
				path: 'category',
				model: 'category'
			}
		})
		.exec((err, result) => {
			res.json(result);
		});
};

const getTotal = (collection) => {
	let total = 0;
	_.map(collection, ({ services }) => {
		_.map(services, ({ quantity, serviceId: { amount } }) => {
			total += quantity * amount;
		});
	});
	return total;
};

exports.getInvoiceInsights = (req, res, next) => {
	Invoice.find()
		.populate({
			path: 'services.serviceId',
			model: 'service'
		})
		.exec((err, result) => {
			let response = {
					monthly: [],
					yearly: [],
					total: 0
				},
				total = getTotal(result),
				monthly = _.groupBy(result, ({ created_at }) => {
					return moment(created_at).format('MMM, YYYY');
				}),
				yearly = _.groupBy(result, ({ created_at }) => {
					return moment(created_at).format('YYYY');
				});
			_.map(monthly, (value, key) => {
				response.monthly.push({
					month: key,
					total: getTotal(value)
				});
			});
			_.map(yearly, (value, key) => {
				response.yearly.push({
					year: key,
					total: getTotal(value)
				});
			});
			response.total = total;
			res.json(response);
		});
};
