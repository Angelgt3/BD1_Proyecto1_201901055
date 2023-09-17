SELECT
    CAN.nombre_candidato AS "Nombre",
    PAR.nombre_partido AS "Partido"
FROM
    proyecto1.CANDIDATO AS CAN
    JOIN proyecto1.PARTIDO AS PAR ON CAN.id_partido = PAR.id_partido
    JOIN proyecto1.CARGO AS CANCAR ON CAN.id_cargo = CANCAR.id_cargo
WHERE
    CANCAR.id_cargo = 6
ORDER BY PAR.nombre_partido;