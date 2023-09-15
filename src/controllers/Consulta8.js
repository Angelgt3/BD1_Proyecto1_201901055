const db = require('../db/conexion');
const config = require('../db/config')
const mysql = require('mysql2/promise')
const {script_consulta8} = require('../db/consultas');

exports.consulta8 = async (req, res) => {

    try {
        const connection = await mysql.createConnection(config.db);
        const result = await db.querywithoutclose(connection,script_consulta8, []);

        res.status(500).json({
            consulta: 8, 
            lineas: result.length, 
            resultado: result,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA PARA REALIZAR LA CONSULTA 8', error },
        });
    }
}