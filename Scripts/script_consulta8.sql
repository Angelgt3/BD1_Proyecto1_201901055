SELECT
    P.nombre_partido AS Partido,
    CP.nombre_candidato AS Presidente,
    CV.nombre_candidato AS Vicepresidente,
    (SELECT COUNT(*)
     FROM proyecto1.VOTO V
     JOIN proyecto1.DETALLE_VOTO DV ON V.id_voto = DV.id_voto
     WHERE DV.id_candidato = CP.id_candidato OR DV.id_candidato = CV.id_candidato) AS Cantidad_Votos
FROM proyecto1.CANDIDATO CP
JOIN proyecto1.CANDIDATO CV ON CP.id_partido = CV.id_partido AND CP.id_candidato <> CV.id_candidato AND CP.id_cargo = 1 AND CV.id_cargo = 2
JOIN proyecto1.PARTIDO P ON CP.id_partido = P.id_partido
ORDER BY Cantidad_Votos DESC
LIMIT 10;