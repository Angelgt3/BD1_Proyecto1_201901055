SELECT
    genero AS Genero,
    COUNT(*) AS Cantidad
FROM proyecto1.VOTO V
JOIN proyecto1.CIUDADANO C ON V.dpi = C.dpi
GROUP BY genero;