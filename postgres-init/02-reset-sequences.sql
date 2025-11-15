/*
 * SCRIPT DE REINICIO DE SECUENCIAS (Versión 2 - Corregida)
 * --------------------------------------------------------
 * Recorre todas las tablas en 'public', encuentra el ID máximo,
 * y actualiza el contador (sequence) para evitar errores de "duplicate key".
 */
DO $$
DECLARE
    -- Variable para iterar sobre las tablas
    r RECORD;
    -- Variable para guardar el ID máximo
    max_id BIGINT;
    -- Variable para guardar el nombre de la secuencia
    seq_name TEXT;
BEGIN
    RAISE NOTICE '--- [INICIO] Reseteo de secuencias (contadores) ---';

    -- 1. Itera sobre todas las tablas en 'public' que tienen una columna 'id'
    FOR r IN
        SELECT t.table_name
        FROM information_schema.tables t
        JOIN information_schema.columns c ON c.table_name = t.table_name AND c.table_schema = t.table_schema
        WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE' AND c.column_name = 'id'
    LOOP
        -- 2. Obtiene el nombre de la secuencia para la columna 'id' de esta tabla
        --    Usamos format() para citar de forma segura el nombre de la tabla
        seq_name := pg_get_serial_sequence(format('public.%I', r.table_name), 'id');

        -- 3. Si la tabla TIENE una secuencia (no es NULL)
        IF seq_name IS NOT NULL THEN
            -- 3a. Obtiene el ID máximo actual de la tabla
            EXECUTE format('SELECT COALESCE(MAX(id), 0) FROM public.%I', r.table_name) INTO max_id;

            RAISE NOTICE 'Tabla: %, ID Máximo: %, Secuencia: %', r.table_name, max_id, seq_name;

            -- 3b. Actualiza la secuencia al valor máximo + 1
            -- (El 'false' al final significa que nextval() devolverá max_id + 1)
            PERFORM setval(seq_name, max_id + 1, false);
            RAISE NOTICE '    -> Secuencia actualizada a %', max_id + 1;
        ELSE
            -- (Se espera para tablas 'join' que tienen 'id' pero no serial)
            RAISE NOTICE 'Tabla: %, (Sin secuencia "id" que actualizar)', r.table_name;
        END IF;
    END LOOP;
    RAISE NOTICE '--- [FIN] Reseteo de secuencias completado ---';
END $$;