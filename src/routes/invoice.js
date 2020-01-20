const express = require('express');
const router = express.Router();

const invoiceCtrl = require('../controllers/invoice-controller');

router.post('/add', invoiceCtrl.addInvoice);
router.get('/', invoiceCtrl.getInvoices);

module.exports = router;
