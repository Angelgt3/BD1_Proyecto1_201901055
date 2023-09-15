const db = require('../db/conexion');
const config = require('../db/config')
const mysql = require('mysql2/promise')
const fs = require('fs');
const path = require('path');
const {script_crear_temporales} = require('../db/scripts');
const { format } = require('path');

const directorioActual = __dirname;
const directorioPadre = path.resolve(directorioActual, '..');

//paths
const filePath_Partido = path.join(directorioPadre, 'datos_csv/partido.csv');
const filePath_Candidato = path.join(directorioPadre, 'datos_csv/candidato.csv');
const filePath_Cargo = path.join(directorioPadre, 'datos_csv/cargo.csv');
const filePath_Detalle_voto = path.join(directorioPadre, 'datos_csv/detalle_voto.csv');
const filePath_Voto = path.join(directorioPadre, 'datos_csv/voto.csv');
const filePath_Ciudadano = path.join(directorioPadre, 'datos_csv/ciudadano.csv');
const filePath_Mesa = path.join(directorioPadre, 'datos_csv/mesa.csv');
const filePath_Departamento = path.join(directorioPadre, 'datos_csv/departamento.csv');


exports.cargar_modelo = async (req, res) => {
    
    // Crear una conexión que se cerrará automáticamente al terminar
    const connection = await mysql.createConnection(config.db);
    // Eliminar los comentarios del script SQL
    const scriptWithoutComments = script_crear_temporales.replace(/(--.*)/g, '');

    // Ejecutar el script SQL sin comentarios
    const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

    for (let i = 0; i < sqlCommands.length; i++) {
        const sql = sqlCommands[i];
        if (sql.length === 0) {
            continue;
        }
        await db.querywithoutclose(connection, sql, []);
    }
    try {
        //DATOS PARTIDO
        const datosPartido = fs.readFileSync(filePath_Partido, 'utf-8');
        const lines = datosPartido.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(';');
            const id_partido = fields[0];
            const nombre_partido = fields[1];
            const siglas = fields[2];
            const fundacion = new Date(fields[3]);
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_PARTIDO (id_partido, nombre_partido, siglas,fundacion) VALUES (?, ?, ?, ?)`, [id_partido,nombre_partido,siglas,fundacion]);
        }
         await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_PARTIDO`, []);
        
         // pasa los datos temp a la real
         await db.querywithoutclose(connection, `INSERT INTO proyecto1.PARTIDO (id_partido,nombre_partido, siglas, fundacion) SELECT id_partido,nombre_partido, siglas, fundacion FROM proyecto1.TEMP_PARTIDO`, []);


         //DATOS CARGO
        const datosCargo = fs.readFileSync(filePath_Cargo, 'utf-8');
        const linesCargo = datosCargo.split('\n');
        for (let i = 1; i < linesCargo.length; i++) {
            const fields = linesCargo[i].split(';');
            const id_cargo = fields[0];
            const cargo = fields[1];
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_CARGO (id_cargo, cargo) VALUES (?, ?)`, [id_cargo,cargo]);
        }
         await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_CARGO`, []);
         // pasa los datos temp a la real
         await db.querywithoutclose(connection, `INSERT INTO proyecto1.CARGO (id_cargo,cargo) SELECT id_cargo,cargo  FROM proyecto1.TEMP_CARGO`, []);


        //DATOS CANDIDATO
        const datosCandidato = fs.readFileSync(filePath_Candidato, 'utf-8');
        const linesCandidato = datosCandidato.split('\n');
        for (let i = 1; i < linesCandidato.length; i++) {
            const fields = linesCandidato[i].split(';');
            const id_candidato = fields[0];
            const nombre_candidato = fields[1];
            const fecha_nacimiento = new Date(fields[2]);
            const id_partido = fields[3];
            const id_cargo = fields[4];
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_CANDIDATO (id_candidato, nombre_candidato,fecha_nacimiento,id_partido,id_cargo) VALUES (?, ?, ?, ?, ?)`, [id_candidato, nombre_candidato,fecha_nacimiento,id_partido,id_cargo]);
        }
        await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_CANDIDATO`, []);
         // pasa los datos temp a la real
         await db.querywithoutclose(connection, `INSERT INTO proyecto1.CANDIDATO (id_candidato, nombre_candidato,fecha_nacimiento,id_partido,id_cargo) SELECT id_candidato, nombre_candidato,fecha_nacimiento,id_partido,id_cargo  FROM proyecto1.TEMP_CANDIDATO`, []);


        //DATOS DEPARTAMENTO
        const datosDepatamento = fs.readFileSync(filePath_Departamento, 'utf-8');
        const linesDepartamento = datosDepatamento.split('\n');
        for (let i = 1; i < linesDepartamento.length; i++) {
            const fields = linesDepartamento[i].split(';');
            const id_departamento = fields[0];
            const nombre = fields[1];
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_DEPARTAMENTO (id_departamento, nombre) VALUES (?, ?)`, [id_departamento, nombre]);
        }
         await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_DEPARTAMENTO`, []);
         // pasa los datos temp a la real
         await db.querywithoutclose(connection, `INSERT INTO proyecto1.DEPARTAMENTO (id_departamento, nombre) SELECT id_departamento, nombre FROM proyecto1.TEMP_DEPARTAMENTO`, []);


         //DATOS MESA
        const datosMesa= fs.readFileSync(filePath_Mesa, 'utf-8');
        const linesMesa = datosMesa.split('\n');
        for (let i = 1; i < linesMesa.length; i++) {
            const fields = linesMesa[i].split(';');
            const id_mesa = fields[0];
            const departamento = fields[1];
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_MESA (id_mesa, departamento) VALUES (?, ?)`, [id_mesa, departamento]);
        }
         await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_MESA`, []);
         // pasa los datos temp a la real
         await db.querywithoutclose(connection, `INSERT INTO proyecto1.MESA (id_mesa, departamento) SELECT id_mesa, departamento FROM proyecto1.TEMP_MESA`, []);


          //DATOS CIUDADANO
        const datosCiudadano= fs.readFileSync(filePath_Ciudadano, 'utf-8');
        const linesCiudadano = datosCiudadano.split('\n');
        for (let i = 1; i < linesCiudadano.length; i++) {
            const fields = linesCiudadano[i].split(';');
            const dpi = fields[0];
            const nombre = fields[1];
            const apellido = fields[2];
            const direccion = fields[3];
            const telefono = fields[4];
            const edad = fields[5];
            const genero = fields[6];
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_CIUDADANO (dpi,nombre,apellido,direccion,telefono,edad,genero) VALUES (?, ?, ?, ?, ?, ?, ?)`, [dpi,nombre,apellido,direccion,telefono,edad,genero]);
        }
         await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_CIUDADANO`, []);
         // pasa los datos temp a la real
         await db.querywithoutclose(connection, `INSERT INTO proyecto1.CIUDADANO (dpi,nombre,apellido,direccion,telefono,edad,genero) SELECT dpi,nombre,apellido,direccion,telefono,edad,genero FROM proyecto1.TEMP_CIUDADANO`, []);


        //DATOS VOTO
        const datosVoto= fs.readFileSync(filePath_Voto, 'utf-8');
        const linesVoto = datosVoto.split('\n');
        for (let i = 1; i < linesVoto.length; i++) {
            const fields = linesVoto[i].split(';');
            const id_voto = fields[0];
            const dpi = fields[1];
            const id_mesa = fields[2];
            const fecha_hora = new Date(fields[3]);
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_VOTO (id_voto,fecha_hora,dpi,id_mesa) VALUES (?, ?, ?, ?)`, [id_voto,fecha_hora,dpi,id_mesa]);
        }
        await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_VOTO`, []);
        // pasa los datos temp a la real
        await db.querywithoutclose(connection, `INSERT INTO proyecto1.VOTO (id_voto,fecha_hora,dpi,id_mesa) SELECT id_voto,fecha_hora,dpi,id_mesa FROM proyecto1.TEMP_VOTO`, []);


        //DATOS DETALLE_VOTO
        const datosDetalleVoto= fs.readFileSync(filePath_Detalle_voto, 'utf-8');
        const linesDetalleVoto = datosDetalleVoto.split('\n');
        for (let i = 1; i < linesDetalleVoto.length; i++) {
            const fields = linesDetalleVoto[i].split(';');
            const id_voto = fields[0];
            const id_candidato = fields[1];
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO proyecto1.TEMP_DETALLE_VOTO (id_voto,id_candidato) VALUES (?, ?)`, [id_voto,id_candidato]);
        }
        await db.querywithoutclose(connection, `SELECT * FROM proyecto1.TEMP_DETALLE_VOTO`, []);
        // pasa los datos temp a la real
        await db.querywithoutclose(connection, `INSERT INTO proyecto1.DETALLE_VOTO (id_voto,id_candidato) SELECT id_voto,id_candidato FROM proyecto1.TEMP_DETALLE_VOTO`, []);

        // Cierra la conexión
        await connection.end();
        res.status(200).json({
            body: { res: true, message: 'CARGA DE DATOS EN EL MODELO CON EXITO' },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CARGAR DATOS EN EL MODELO', error },
        });
    }
}


