const { WebhookClient } = require('dialogflow-fulfillment');
const { Router } = require('express');
const router = Router();

const { getServicios, getFacturas, webhook } = require('../controllers/index.controller');

router.get('/servicios', getServicios);
router.get('/facturas', getFacturas);
router.post('/webhook', webhook);

module.exports = router;