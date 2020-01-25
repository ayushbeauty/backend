const express = require('express');
const router = express.Router();

const customerCtrl = require('./../controllers/customer-controller');

router.get('/', customerCtrl.getCustomers);
router.post('/getCustomerByMobileNumber', customerCtrl.getCustomerByMobileNumber);

module.exports = router;
