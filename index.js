const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const invoiceRoutes = require('./src/routes/invoice');
const serviceRoutes = require('./src/routes/service');
const categoryRoutes = require('./src/routes/category');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
	.connect('mongodb://localhost:27017/ayush', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then((result) => {
		console.log('Connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/', (req, res) => {
	res.json('Working');
});

app.use('/category', categoryRoutes);

app.use('/service', serviceRoutes);

app.use('/invoice', invoiceRoutes);

app.listen(8000);
