const script = `
-- CREAR BASE DE DATOS

CREATE SCHEMA IF NOT EXISTS proyecto1;

--  TABLA PARTIDO

CREATE TABLE IF NOT EXISTS proyecto1.PARTIDO (
  id_partido INTEGER NOT NULL AUTO_INCREMENT,
  nombre_partido VARCHAR(50) NOT NULL,
  siglas VARCHAR(50) NOT NULL,
  fundacion DATE NOT NULL,
  PRIMARY KEY (id_partido));

  --  TABLA CARGO

  CREATE TABLE IF NOT EXISTS proyecto1.CARGO (
    id_cargo INTEGER NOT NULL AUTO_INCREMENT,
    cargo VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_cargo));

-- TABLA CANDIDATO

CREATE TABLE IF NOT EXISTS proyecto1.CANDIDATO (
  id_candidato INTEGER NOT NULL AUTO_INCREMENT,
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
  id_departamento INTEGER NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_departamento));


--  TABLA MESA

CREATE TABLE IF NOT EXISTS proyecto1.MESA (
  id_mesa INTEGER NOT NULL AUTO_INCREMENT,
  departamneto INTEGER NOT NULL,
  PRIMARY KEY (id_mesa),
  FOREIGN KEY (departamneto) REFERENCES proyecto1.DEPARTAMENTO (id_departamento)
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
    id_voto INTEGER NOT NULL AUTO_INCREMENT,
    fecha_hora DATE NOT NULL,
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



module.exports = script;