SELECT
    M.id_mesa AS No_Mesa,
    D.nombre AS Departamento,
    COUNT(*) AS Cantidad_Votos
FROM proyecto1.MESA M
JOIN proyecto1.VOTO V ON M.id_mesa = V.id_mesa
JOIN proyecto1.DEPARTAMENTO D ON M.departamento = D.id_departamento
GROUP BY No_Mesa, Departamento
ORDER BY Cantidad_Votos DESC
LIMIT 5;