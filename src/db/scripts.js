//SCRIPT PARA CREAR EL MODELO
const script_crear_modelo = `
-- CREAR BASE DE DATOS

CREATE SCHEMA IF NOT EXISTS proyecto1;

--  TABLA PARTIDO

CREATE TABLE IF NOT EXISTS proyecto1.PARTIDO (
  id_partido INTEGER NOT NULL,
  nombre_partido VARCHAR(50) NOT NULL,
  siglas VARCHAR(50) NOT NULL,
  fundacion DATE NOT NULL,
  PRIMARY KEY (id_partido));

  --  TABLA CARGO

  CREATE TABLE IF NOT EXISTS proyecto1.CARGO (
    id_cargo INTEGER NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_cargo));

-- TABLA CANDIDATO

CREATE TABLE IF NOT EXISTS proyecto1.CANDIDATO (
  id_candidato INTEGER NOT NULL,
  nombre_candidato VARCHAR(50) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  id_partido INTEGER NOT NULL,
  id_cargo INTEGER NOT NULL,
  PRIMARY KEY (id_candidato),
  FOREIGN KEY (id_partido) REFERENCES proyecto1.PARTIDO (id_partido),
  FOREIGN KEY (id_cargo) REFERENCES proyecto1.CARGO (id_cargo)
  );


--  TABLA DEPARTAMENTO

CREATE TABLE IF NOT EXISTS proyecto1.DEPARTAMENTO (
  id_departamento INTEGER NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_departamento));


--  TABLA MESA

CREATE TABLE IF NOT EXISTS proyecto1.MESA (
  id_mesa INTEGER NOT NULL,
  departamento INTEGER NOT NULL,
  PRIMARY KEY (id_mesa),
  FOREIGN KEY (departamento) REFERENCES proyecto1.DEPARTAMENTO (id_departamento)
  );


--  TABLA CIUDADANO

CREATE TABLE IF NOT EXISTS proyecto1.CIUDADANO (
  dpi VARCHAR(13) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(10) NOT NULL,
  edad INTEGER NOT NULL,
  genero VARCHAR(1) NOT NULL, 
  PRIMARY KEY (dpi));


  --  TABLA VOTO

  CREATE TABLE IF NOT EXISTS proyecto1.VOTO (
    id_voto INTEGER NOT NULL,
    fecha_hora DATETIME NOT NULL,
    dpi VARCHAR(13) NOT NULL,
    id_mesa INTEGER NOT NULL,
    PRIMARY KEY (id_voto),
    FOREIGN KEY (dpi) REFERENCES proyecto1.CIUDADANO (dpi),
    FOREIGN KEY (id_mesa) REFERENCES proyecto1.MESA (id_mesa)
    );


    --  TABLA DETALLE_VOTO

    CREATE TABLE IF NOT EXISTS proyecto1.DETALLE_VOTO (
      id_detalle_voto INTEGER NOT NULL AUTO_INCREMENT,
      id_voto INTEGER NOT NULL,
      id_candidato INTEGER NOT NULL,
      PRIMARY KEY (id_detalle_voto),
      FOREIGN KEY (id_voto) REFERENCES proyecto1.VOTO (id_voto),
      FOREIGN KEY (id_candidato) REFERENCES proyecto1.CANDIDATO (id_candidato)
      );

`;

//SCRIPT PARA CREAR LAS TABLAS TEMPORALES
const script_crear_temporales = `
--  TABLA PARTIDO

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_PARTIDO (
  id_partido INTEGER NOT NULL,
  nombre_partido VARCHAR(50) NOT NULL,
  siglas VARCHAR(50) NOT NULL,
  fundacion DATE NOT NULL
  );

  --  TABLA CARGO

  CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_CARGO (
    id_cargo INTEGER NOT NULL,
    cargo VARCHAR(50) NOT NULL
    );

-- TABLA CANDIDATO

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_CANDIDATO (
  id_candidato INTEGER NOT NULL,
  nombre_candidato VARCHAR(50) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  id_partido INTEGER NOT NULL,
  id_cargo INTEGER NOT NULL
  );


--  TABLA DEPARTAMENTO

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_DEPARTAMENTO (
  id_departamento INTEGER NOT NULL,
  nombre VARCHAR(50) NOT NULL
  );


--  TABLA MESA

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_MESA (
  id_mesa INTEGER NOT NULL,
  departamento INTEGER NOT NULL
  );


--  TABLA CIUDADANO

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_CIUDADANO (
  dpi VARCHAR(13) NOT NULL, 
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(10) NOT NULL,
  edad INTEGER NOT NULL,
  genero VARCHAR(1) NOT NULL
  );


  --  TABLA VOTO

  CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_VOTO (
    id_voto INTEGER NOT NULL,
    fecha_hora DATETIME NOT NULL,
    dpi VARCHAR(13) NOT NULL,
    id_mesa INTEGER NOT NULL
    );


--  TABLA DETALLE_VOTO

CREATE TEMPORARY TABLE IF NOT EXISTS proyecto1.TEMP_DETALLE_VOTO (
  id_voto INTEGER NOT NULL,
  id_candidato INTEGER NOT NULL
  );

`;

//SCRIPT PARA BORRAR EL MODELO
const script_borrar_modelo = `
    -- BORRAR BASE DE DATOS
        DROP DATABASE IF EXISTS proyecto1;

    -- BORRAR TABLA PARTIDO
    DROP TABLE IF EXISTS proyecto1.PARTIDO;

    -- BORRAR TABLA CANDIDATO
    DROP TABLE IF EXISTS proyecto1.CANDIDATO;

    -- BORRAR TABLA CARGO
    DROP TABLE IF EXISTS proyecto1.CARGO;
    
    -- BORRAR TABLA DETALLE DETALLE_VOTO
    DROP TABLE IF EXISTS proyecto1.DETALLE_VOTO;

    -- BORRAR TABLA DETALLE VOTO
    DROP TABLE IF EXISTS proyecto1.VOTO;

    -- BORRAR TABLA DETALLE MESA
    DROP TABLE IF EXISTS proyecto1.MESA;

    -- BORRAR TABLA DETALLE CIUDADANO
    DROP TABLE IF EXISTS proyecto1.CIUDADANO;
    
    -- BORRAR TABLA DETALLE DEPARTAMENTO
    DROP TABLE IF EXISTS proyecto1.DEPARTAMENTO;
    `

    module.exports = {
      script_crear_modelo,
      script_borrar_modelo,
      script_crear_temporales,
    };