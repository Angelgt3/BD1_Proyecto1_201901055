const express = require('express');
const router = express.Router();

const { crear_modelo } = require('../controllers/CrearModelo');
const { borrar_modelo } = require('../controllers/EliminarModelo');
const { cargar_modelo } = require('../controllers/CargarModelo');
const { consulta1 } = require('../controllers/Consulta1');
const { consulta2 } = require('../controllers/Consulta2');
const { consulta3 } = require('../controllers/Consulta3');
const { consulta4 } = require('../controllers/Consulta4');
const { consulta5 } = require('../controllers/Consulta5');
const { consulta6 } = require('../controllers/Consulta6');
const { consulta7 } = require('../controllers/Consulta7');
const { consulta8 } = require('../controllers/Consulta8');
const { consulta9 } = require('../controllers/Consulta9');
const { consulta10 } = require('../controllers/Consulta10');
const { consulta11 } = require('../controllers/Consulta11');


router.get('/crearmodelo',crear_modelo)
router.get('/eliminarmodelo',borrar_modelo)
router.get('/cargartabtemp',cargar_modelo)
router.get('/consulta1',consulta1)
router.get('/consulta2',consulta2)
router.get('/consulta3',consulta3)
router.get('/consulta4',consulta4)
router.get('/consulta5',consulta5)
router.get('/consulta6',consulta6)
router.get('/consulta7',consulta7)
router.get('/consulta8',consulta8)
router.get('/consulta9',consulta9)
router.get('/consulta10',consulta10)
router.get('/consulta11',consulta11)


module.exports = router;