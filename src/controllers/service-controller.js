const { groupBy } = require('lodash');

const Service = require('./../models/service');

exports.addService = ({ body: { title, amount, category } }, res, next) => {
	const serviceIns = new Service({ title, amount, category });
	serviceIns
		.save()
		.then((result) => {
			res.send('Service added');
		})
		.catch((err) => console.log(err));
};

exports.getAllServices = (req, res, next) => {
	Service.find().populate({ path: 'category' }).then((result) => {
		res.json(groupBy(result, 'category.name'));
	});
};
