SELECT
    proyecto1.PARTIDO.nombre_partido AS "Partido",
    COUNT(*) AS "Cantidad"
FROM
    proyecto1.CANDIDATO 
    JOIN proyecto1.PARTIDO ON proyecto1.CANDIDATO.id_partido = proyecto1.PARTIDO.id_partido
WHERE
    proyecto1.CANDIDATO.id_cargo IN (3, 4, 5) 
GROUP BY
    proyecto1.PARTIDO.nombre_partido
ORDER BY proyecto1.PARTIDO.nombre_partido;