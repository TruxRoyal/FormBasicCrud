SELECT 
    u.email,               -- Email del usuario
    u.nombre,              -- Nombre del usuario
    u.apellido,            -- Apellido del usuario
    u.sexo,                -- Sexo del usuario
    u.fecha_nacimiento,    -- Fecha de nacimiento del usuario
    u.direccion,           -- Dirección del usuario
    u.vivienda,            -- Tipo de vivienda del usuario (Casa/Apartamento)
    u.pais,                -- Nombre del país (puede ser redundante si se utiliza la relación con `countries`)
    u.estado,              -- Nombre del estado o departamento (puede ser redundante si se utiliza la relación con `states`)
    u.ciudad,              -- Nombre de la ciudad (puede ser redundante si se utiliza la relación con `cities`)
    u.observacion,         -- Observaciones adicionales sobre el usuario
    u.id_country,          -- ID del país (llave foránea hacia la tabla `countries`)
    u.id_state,            -- ID del estado o departamento (llave foránea hacia la tabla `states`)
    u.id_city,             -- ID de la ciudad (llave foránea hacia la tabla `cities`)
    c.name AS nombre_pais, -- Nombre del país desde la tabla `countries`, obtenido mediante la relación
    s.name AS nombre_estado, -- Nombre del estado o departamento desde la tabla `states`
    ci.name AS nombre_ciudad -- Nombre de la ciudad desde la tabla `cities`
FROM 
    usuarios u
JOIN 
    countries c ON u.id_country = c.id
JOIN 
    states s ON u.id_state = s.id
JOIN 
    cities ci ON u.id_city = ci.id;
