const { Router } = require('express');
const router = Router();

const { getServicios } = require('../controllers/index.controller');

router.get('/servicios', getServicios);

module.exports = router;