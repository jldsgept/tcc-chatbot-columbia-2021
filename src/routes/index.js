const { Router } = require('express');
const router = Router();

const { getServicios, getFacturas } = require('../controllers/index.controller');

router.get('/servicios', getServicios);
router.get('/facturas', getFacturas);

module.exports = router;