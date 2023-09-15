const script_consulta1 = `
SELECT
    PRESI.nombre_candidato AS "Presidente",
    VICE.nombre_candidato AS "nombre Vicepresidente",
    proyecto1.PARTIDO.nombre_partido AS "Partido"
FROM
    proyecto1.CANDIDATO AS PRESI
	JOIN proyecto1.CANDIDATO AS VICE ON PRESI.id_partido = VICE.id_partido
    JOIN proyecto1.CARGO AS CARPRESI ON PRESI.id_cargo = CARPRESI.id_cargo
    JOIN proyecto1.CARGO AS CARVICE ON VICE.id_cargo = CARVICE.id_cargo
    JOIN proyecto1.PARTIDO ON PRESI.id_partido = proyecto1.PARTIDO.id_partido
WHERE
    CARPRESI.id_cargo = 1
    AND CARVICE.id_cargo = 2;
`

const script_consulta2 = `
SELECT
    proyecto1.PARTIDO.nombre_partido AS "Partido",
    COUNT(*) AS "Número de Candidatos"
FROM
    proyecto1.CANDIDATO 
    JOIN proyecto1.PARTIDO ON proyecto1.CANDIDATO.id_partido = proyecto1.PARTIDO.id_partido
WHERE
    proyecto1.CANDIDATO.id_cargo IN (3, 4, 5) 
GROUP BY
    proyecto1.PARTIDO.nombre_partido;
`

const script_consulta3 = `
SELECT
    CAN.nombre_candidato AS "nombre alcalde",
    PAR.nombre_partido AS "partido"
FROM
    proyecto1.CANDIDATO AS CAN
    JOIN proyecto1.PARTIDO AS PAR ON CAN.id_partido = PAR.id_partido
    JOIN proyecto1.CARGO AS CANCAR ON CAN.id_cargo = CANCAR.id_cargo
WHERE
    CANCAR.id_cargo = 6;
`

const script_consulta4 = `
SELECT
    proyecto1.PARTIDO.nombre_partido AS "Partido",
    COUNT(*) AS "Número de Candidatos"
FROM
    proyecto1.CANDIDATO 
    JOIN proyecto1.PARTIDO ON proyecto1.CANDIDATO.id_partido = proyecto1.PARTIDO.id_partido
WHERE
    proyecto1.CANDIDATO.id_cargo IN (1,2,3, 4,5,6) 
GROUP BY
    proyecto1.PARTIDO.nombre_partido;
`

const script_consulta5 = `
SELECT
    proyecto1.DEPARTAMENTO.nombre AS "Departamento",
    COUNT(proyecto1.VOTO.id_voto) AS "Cantidad de Votaciones"
FROM
    proyecto1.VOTO
    JOIN proyecto1.MESA ON proyecto1.VOTO.id_mesa = proyecto1.MESA.id_mesa
    JOIN proyecto1.DEPARTAMENTO ON proyecto1.MESA.departamento = proyecto1.DEPARTAMENTO.id_departamento
GROUP BY
    proyecto1.DEPARTAMENTO.nombre;
`

const script_consulta6 = `
SELECT COUNT(*) AS "Cantidad de Votos Nulos"
FROM proyecto1.DETALLE_VOTO
WHERE id_candidato = -1;
`

const script_consulta7 = `
SELECT edad, COUNT(*) AS cantidad_de_votos
FROM proyecto1.CIUDADANO C
JOIN proyecto1.VOTO V ON C.dpi = V.dpi
GROUP BY edad
ORDER BY cantidad_de_votos DESC, edad DESC
LIMIT 10;
`

const script_consulta8 = `
SELECT
    P.nombre_partido AS Partido,
    CP.nombre_candidato AS Presidente,
    CV.nombre_candidato AS Vicepresidente,
    (SELECT COUNT(*)
     FROM proyecto1.VOTO V
     JOIN proyecto1.DETALLE_VOTO DV ON V.id_voto = DV.id_voto
     WHERE DV.id_candidato = CP.id_candidato OR DV.id_candidato = CV.id_candidato) AS NoVotos
FROM proyecto1.CANDIDATO CP
JOIN proyecto1.CANDIDATO CV ON CP.id_partido = CV.id_partido AND CP.id_candidato <> CV.id_candidato AND CP.id_cargo = 1 AND CV.id_cargo = 2
JOIN proyecto1.PARTIDO P ON CP.id_partido = P.id_partido
ORDER BY NoVotos DESC
LIMIT 10;
`

const script_consulta9 = `
SELECT
    M.id_mesa AS NoMesa,
    D.nombre AS Departamento,
    COUNT(*) AS Cantidad
FROM proyecto1.MESA M
JOIN proyecto1.VOTO V ON M.id_mesa = V.id_mesa
JOIN proyecto1.DEPARTAMENTO D ON M.departamento = D.id_departamento
GROUP BY NoMesa, Departamento
ORDER BY Cantidad DESC
LIMIT 5;
`

const script_consulta10 = `
SELECT
    HOUR(fecha_hora) AS Hora,
    COUNT(*) AS Cantidad
FROM proyecto1.VOTO
GROUP BY Hora
ORDER BY Cantidad DESC
LIMIT 5;

`

const script_consulta11 = `
SELECT
    genero,
    COUNT(*) AS CantidadVotos
FROM proyecto1.VOTO V
JOIN proyecto1.CIUDADANO C ON V.dpi = C.dpi
GROUP BY genero;
`
module.exports = {
    script_consulta1,
    script_consulta2,
    script_consulta3,
    script_consulta4,
    script_consulta5,
    script_consulta6,   
    script_consulta7,
    script_consulta8,
    script_consulta9,
    script_consulta10
  };