const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

//configuracion
app.set('port', process.env.SERVER_PORT);

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(require('./src/routes/rutas'));

module.exports = app;