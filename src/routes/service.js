const express = require('express');
const router = express.Router();

const serviceCtrl = require('./../controllers/service-controller');

// Prefix /service
router.post('/add', serviceCtrl.addService);
router.get('/', serviceCtrl.getAllServices);
router.post('/update', serviceCtrl.updateService);

module.exports = router;
