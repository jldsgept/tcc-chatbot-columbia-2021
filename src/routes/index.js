const { WebhookClient } = require('dialogflow-fulfillment');
const { Router } = require('express');
const router = Router();

const { getServicios, webhook } = require('../controllers/index.controller');

router.get('/test', getServicios);
router.post('/webhook', webhook);

module.exports = router;