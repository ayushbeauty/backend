const express = require('express');
const router = express.Router();

const invoiceCtrl = require('../controllers/invoice-controller');

router.post('/add', invoiceCtrl.addInvoice);

module.exports = router;
