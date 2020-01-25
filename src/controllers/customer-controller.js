const Customer = require('./../models/customer');

exports.getCustomers = (req, res, next) => {
	Customer.find()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => console.log(err));
};

exports.getCustomerByMobileNumber = ({ body: { mobileNumber } }, res, next) => {
	Customer.find({ mobileNumber })
		.then((result) => {
			if (result.length > 0) res.json(result[0]);
			else res.status(400).send({ message: 'User not found' });
		})
		.catch((err) => console.log(err));
};
