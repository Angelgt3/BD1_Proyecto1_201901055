CREATE SCHEMA IF NOT EXISTS proyecto1;

CREATE TABLE IF NOT EXISTS proyecto1.PARTIDO (
id_partido INTEGER NOT NULL,
nombre_partido VARCHAR(50) NOT NULL,
siglas VARCHAR(50) NOT NULL,
fundacion DATE NOT NULL,
PRIMARY KEY (id_partido));

CREATE TABLE IF NOT EXISTS proyecto1.CARGO (
id_cargo INTEGER NOT NULL,
cargo VARCHAR(50) NOT NULL,
PRIMARY KEY (id_cargo));

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

CREATE TABLE IF NOT EXISTS proyecto1.DEPARTAMENTO (
id_departamento INTEGER NOT NULL,
nombre VARCHAR(50) NOT NULL,
PRIMARY KEY (id_departamento));

CREATE TABLE IF NOT EXISTS proyecto1.MESA (
id_mesa INTEGER NOT NULL,
departamento INTEGER NOT NULL,
PRIMARY KEY (id_mesa),
FOREIGN KEY (departamento) REFERENCES proyecto1.DEPARTAMENTO (id_departamento)
);

CREATE TABLE IF NOT EXISTS proyecto1.CIUDADANO (
dpi VARCHAR(13) NOT NULL,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
direccion VARCHAR(100) NOT NULL,
telefono VARCHAR(10) NOT NULL,
edad INTEGER NOT NULL,
genero VARCHAR(1) NOT NULL, 
PRIMARY KEY (dpi));

CREATE TABLE IF NOT EXISTS proyecto1.VOTO (
id_voto INTEGER NOT NULL,
fecha_hora DATETIME NOT NULL,
dpi VARCHAR(13) NOT NULL,
id_mesa INTEGER NOT NULL,
PRIMARY KEY (id_voto),
FOREIGN KEY (dpi) REFERENCES proyecto1.CIUDADANO (dpi),
FOREIGN KEY (id_mesa) REFERENCES proyecto1.MESA (id_mesa)
);

CREATE TABLE IF NOT EXISTS proyecto1.DETALLE_VOTO (
    id_detalle_voto INTEGER NOT NULL AUTO_INCREMENT,
    id_voto INTEGER NOT NULL,
    id_candidato INTEGER NOT NULL,
    PRIMARY KEY (id_detalle_voto),
    FOREIGN KEY (id_voto) REFERENCES proyecto1.VOTO (id_voto),
    FOREIGN KEY (id_candidato) REFERENCES proyecto1.CANDIDATO (id_candidato)
    );