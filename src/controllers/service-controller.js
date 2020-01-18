const Service = require('./../models/service');

exports.addService = ({ body: { title, amount } }, res, next) => {
	const serviceIns = new Service({ title, amount });
	serviceIns
		.save()
		.then((result) => {
			res.send('Service added');
		})
		.catch((err) => console.log(err));
};

exports.getAllServices = (req, res, next) => {
	Service.find().then((result) => {
		res.json(result);
	});
};
