const express = require('express');
const router = express.Router();

const invoiceCtrl = require('../controllers/invoice-controller');

// Prefix /invoice
router.get('/', invoiceCtrl.getInvoices);
router.post('/add', invoiceCtrl.addInvoice);
router.get('/get/:id', invoiceCtrl.getInvoice);

module.exports = router;
