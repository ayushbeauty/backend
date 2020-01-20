const express = require('express');
const router = express.Router();

const customerCtrl = require('./../controllers/customer-controller');

router.get('/', customerCtrl.getCustomers);

module.exports = router;
