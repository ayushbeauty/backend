const Customer = require('./../models/customer');

exports.getCustomers = (req, res, next) => {
	Customer.find()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => console.log(err));
};
