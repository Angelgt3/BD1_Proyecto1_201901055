const express = require('express');
const router = express.Router();

const { crear_modelo } = require('../controllers/CrearModelo');
const { borrar_modelo } = require('../controllers/EliminarModelo');
const { cargar_modelo } = require('../controllers/CargarModelo');


router.get('/crearmodelo',crear_modelo)
router.get('/eliminarmodelo',borrar_modelo)
router.get('/cargartabtemp',cargar_modelo)


module.exports = router;