SELECT
    PRESI.nombre_candidato AS "Presidente",
    VICE.nombre_candidato AS "Vicepresidente",
    proyecto1.PARTIDO.nombre_partido AS "Partido"
FROM
    proyecto1.CANDIDATO AS PRESI
	JOIN proyecto1.CANDIDATO AS VICE ON PRESI.id_partido = VICE.id_partido
    JOIN proyecto1.CARGO AS CARPRESI ON PRESI.id_cargo = CARPRESI.id_cargo
    JOIN proyecto1.CARGO AS CARVICE ON VICE.id_cargo = CARVICE.id_cargo
    JOIN proyecto1.PARTIDO ON PRESI.id_partido = proyecto1.PARTIDO.id_partido
WHERE
    CARPRESI.id_cargo = 1
    AND CARVICE.id_cargo = 2
ORDER BY proyecto1.PARTIDO.nombre_partido;