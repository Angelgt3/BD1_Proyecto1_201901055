SELECT
    HOUR(fecha_hora) AS Hora,
    COUNT(*) AS Cantidad
FROM proyecto1.VOTO
GROUP BY Hora
ORDER BY Cantidad DESC
LIMIT 5;