const express = require('express');
const router = express.Router();

const { modelo } = require('../controllers/CrearModelo');



router.get('/crearmodelo',modelo)



module.exports = router;