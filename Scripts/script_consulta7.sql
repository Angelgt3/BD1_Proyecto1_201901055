SELECT edad AS Edad, COUNT(*) AS Cantidad
FROM proyecto1.CIUDADANO C
JOIN proyecto1.VOTO V ON C.dpi = V.dpi
GROUP BY edad
ORDER BY cantidad DESC, edad DESC
LIMIT 10;