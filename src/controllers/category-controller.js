const Category = require('./../models/category');

exports.addCategory = ({ body: { name } }, res, next) => {
	const categoryIns = new Category({ name });
	categoryIns.save().then((result) => {
		res.send('Category Added');
	});
};

exports.getAllCategories = (req, res, next) => {
	Category.find().then((result) => {
		res.json(result);
	});
};

exports.updateCategory = ({ body }, res, next) => {
	Category.update({ _id: body._id }, body).then(() => res.json('Updated')).catch((err) => res.send(err));
};
