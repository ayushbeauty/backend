const { groupBy } = require('lodash');

const Service = require('./../models/service');

exports.addService = ({ body: { title, amount, category } }, res, next) => {
	const serviceIns = new Service({ title, amount, category });
	serviceIns
		.save()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => console.log(err));
};

exports.getAllServices = (req, res, next) => {
	Service.find().populate({ path: 'category' }).then((result) => {
		res.json(groupBy(result, 'category.name'));
	});
};

exports.updateService = ({ body }, res, next) => {
	Service.update({ _id: body._id }, body).then(() => res.json('Updated')).catch((err) => res.send(err));
};
