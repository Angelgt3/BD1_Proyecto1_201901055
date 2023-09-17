SELECT
    proyecto1.DEPARTAMENTO.nombre AS "Departamento",
    COUNT(proyecto1.VOTO.id_voto) AS "Cantidad"
FROM
    proyecto1.VOTO
    JOIN proyecto1.MESA ON proyecto1.VOTO.id_mesa = proyecto1.MESA.id_mesa
    JOIN proyecto1.DEPARTAMENTO ON proyecto1.MESA.departamento = proyecto1.DEPARTAMENTO.id_departamento
GROUP BY
    proyecto1.DEPARTAMENTO.nombre
    ORDER BY proyecto1.DEPARTAMENTO.nombre;