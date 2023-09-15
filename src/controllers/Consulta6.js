const db = require('../db/conexion');
const config = require('../db/config')
const mysql = require('mysql2/promise')
const {script_consulta6} = require('../db/consultas');

exports.consulta6 = async (req, res) => {

    try {
        const connection = await mysql.createConnection(config.db);
        const result = await db.querywithoutclose(connection,script_consulta6, []);

        res.status(500).json({
            consulta: 6, 
            lineas: result.length, 
            resultado: result,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA PARA REALIZAR LA CONSULTA 6', error },
        });
    }
}