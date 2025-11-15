/*
 * SCRIPT DE REINICIO DE SECUENCIAS
 * -------------------------------
 * Este script soluciona el problema de "duplicate key" después de sembrar
 * una base de datos con --data-only.
 *
 * Recorre todas las tablas en el esquema 'public', encuentra el valor
 * máximo de la columna 'id', y actualiza el contador (sequence)
 * correspondiente a ese valor + 1.
 *
 * Esto asegura que los nuevos INSERTs desde la aplicación (Strapi)
 * no chocarán con los datos sembrados.
 */
DO $$
DECLARE
    -- Declara variables para almacenar el nombre de la tabla y el último ID
    table_name_ TEXT;
    max_id BIGINT;
BEGIN
    RAISE NOTICE '--- Iniciando reseteo de secuencias (contadores) ---';

    -- Itera sobre todas las tablas en el esquema 'public' que tienen una columna 'id'
    FOR table_name_ IN
        SELECT t.table_name
        FROM information_schema.tables t
        JOIN information_schema.columns c ON c.table_name = t.table_name AND c.table_schema = t.table_schema
        WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE' AND c.column_name = 'id'
    LOOP
        -- Construye y ejecuta una consulta para obtener el ID máximo de la tabla actual
        -- Ejs: 'SELECT COALESCE(MAX(id), 0) FROM public."publicaciones"'
        EXECUTE format('SELECT COALESCE(MAX(id), 0) FROM public.%I', table_name_) INTO max_id;

        RAISE NOTICE 'Tabla: %, ID Máximo: %', table_name_, max_id;

        -- Actualiza la secuencia de la tabla.
        -- pg_get_serial_sequence() encuentra el nombre de la secuencia (ej. 'publicaciones_id_seq')
        -- setval() actualiza el contador. El 'false' al final significa que el próximo
        -- nextval() devolverá max_id + 1.
        -- Usamos un bloque BEGIN...EXCEPTION para ignorar tablas que no tengan secuencias (vistas, etc.)
        BEGIN
            PERFORM setval(
                pg_get_serial_sequence('public."' || table_name_ || '"', 'id'),
                max_id + 1,
                false
            );
            RAISE NOTICE '    -> Secuencia actualizada a %', max_id + 1;
        EXCEPTION WHEN OTHERS THEN
            -- Esto es esperado para tablas que no usan secuencias (ej. tablas de 'join')
            RAISE NOTICE '    -> (Sin secuencia "id" que actualizar)';
        END
    END LOOP;
    RAISE NOTICE '--- Reseteo de secuencias completado ---';
END $$;