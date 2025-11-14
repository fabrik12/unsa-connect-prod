# Backend del Sistema de Información "UNSA Connect" (FSI)

Este repositorio contiene el backend y CMS para el proyecto "UNSA Connect", desarrollado para el curso de Fundamentos de Sistemas de Información (FSI).

## 1. Visión del Proyecto

El objetivo es desarrollar el núcleo de un Sistema de Información que transforme la comunicación institucional de la UNSA, pasando de un modelo fragmentado a una plataforma centralizada.

Este backend (CMS) se construye usando **Strapi v5** y servirá como la API REST principal para futuros clientes (web o móviles).

## 2. Tech Stack

- **Framework:** Strapi v5 (Node.js)
- **Base de Datos:** Supabase (PostgreSQL)
- **Autenticación:** Strapi Users & Permissions (JWT)
- **Notificaciones:** Firebase Cloud Messaging (FCM)

---

## 3. Configuración del Entorno de Desarrollo (con Docker)

Este proyecto está configurado para ejecutarse con Docker y Docker Compose, lo que garantiza un entorno de desarrollo consistente.

### Prerrequisitos

- Docker
- Docker Compose (generalmente viene con Docker Desktop)

### Pasos de Instalación y Desarrollo

1.  **Clonar el repositorio:**

    ```bash
    git clone [URL_DE_TU_REPO]
    cd [NOMBRE_DEL_REPO]
    ```

2.  **Configurar variables de entorno:**

    El backend con Strapi puede conectarse a dos tipos de base de datos según el entorno:

    - **Producción (`main`)** → Supabase (DB + Storage).
    - **Desarrollo (`develop` y ramas feature)** → Postgres local en contenedor Docker.

    #### Archivos `.env`

    Usamos diferentes archivos de configuración para cada entorno:

    - `.env.development` → Postgres local.
    - `.env.production` → Supabase (Render).

    En el repositorio se encuentran los templates:

    - `.env.development.example`
    - `.env.production.example`

    Cada desarrollador debe copiar el template y renombrarlo:

    ```bash
    cp .env.development.example .env.development
    ```

3.  **Instalar dependencias (local):**
    Si vas a trabajar en modo desarrollo (hot-reload), ejecuta SIEMPRE:

    ```bash
    yarn install
    ```

    Esto instalará las dependencias en tu máquina local y generará la carpeta `node_modules`, necesaria para que Strapi funcione correctamente cuando el código fuente se monta como volumen en Docker.

    > **Importante:** Si no ejecutas `yarn install` antes de levantar el contenedor, el backend no funcionará correctamente en modo desarrollo.

    > Si solo quieres construir la imagen y no necesitas hot-reload, puedes comentar el volumen del código fuente en `docker-compose.yml` y no es necesario tener `node_modules` localmente.

4.  **Construir e iniciar el contenedor de Strapi:**
    Este comando construirá la imagen de Strapi y levantará solo el backend (no hay contenedor de base de datos, se usa Supabase externo).

    ```bash
    docker-compose up --build
    ```

    > **Nota sobre Docker y desarrollo:**
    > El archivo `docker-compose.yml` monta el código fuente local como volumen para permitir hot-reload. Esto sobrescribe los `node_modules` del contenedor con los de tu máquina local. Por eso, es obligatorio ejecutar `yarn install` localmente antes de levantar el contenedor.

    > Si tienes problemas con dependencias, puedes comentar la línea del volumen en `docker-compose.yml`:
    >
    > ```yaml
    > # - ./:/opt/app
    > ```
    >
    > y reconstruir la imagen con:
    >
    > ```bash
    > docker-compose build --no-cache
    > docker-compose up
    > ```

5.  Proceso de Sembrado de la Base de Datos Local

    Para poblar tu base de datos local de Postgres, necesitas generar el archivo `01-seed-data.sql` desde Supabase.

    **Este archivo está excluido de Git por razones de seguridad y tamaño.**

    ## Pasos

    1.  Asegúrate de tener tus variables de entorno de Supabase (`$SUPA_HOST`, `$SUPA_PASSWORD`, etc.) cargadas en tu terminal.
    2.  Ejecuta el siguiente comando `pg_dump` desde la raíz del proyecto:

        ```bash
        docker run --rm \
        -e PGPASSWORD="$SUPA_PASSWORD" \
        postgres:17-alpine \
        pg_dump \
            -h "$SUPA_HOST" \
            -p "$SUPA_PORT" \
            -U "$SUPA_USER" \
            -d "$SUPA_DB" \
            --data-only \
            -n public \
            --inserts \
            --exclude-table-data=public.strapi_database_schema \
            --exclude-table-data=public.strapi_migrations \
            --exclude-table-data=public.strapi_migrations_internal \
        > postgres-init/01-seed-data.sql
        ```

    3.  Una vez generado el archivo, sigue el flujo de arranque: `docker-compose down -v`, `docker-compose up`, espera a Strapi, y luego ejecuta el sembrado:

        ```bash
        cat postgres-init/* | docker-compose exec -T postgres psql -U strapi -d strapi_dev
        ```

6.  **Acceder al Admin:**
    Abre `http://localhost:1337/admin` en tu navegador y crea tu primer usuario administrador (o accede desde los creados previamente).

### Comandos útiles de Docker

- **Ver logs (si algo falla):** `docker-compose logs -f`
- **Detener los servicios:** `docker-compose down`
- **Reiniciar los servicios:** `docker-compose restart`

---

> **Recomendación para equipos de desarrollo:**
>
> - Ejecuta `yarn install` localmente antes de levantar el contenedor.
> - Si tienes problemas con dependencias, elimina la carpeta `node_modules` y vuelve a ejecutar `yarn install`.
> - Para evitar conflictos, no mezcles `yarn.lock` y `package-lock.json`.
> - Si solo quieres probar la imagen sin hot-reload, comenta el volumen del código fuente en `docker-compose.yml`.

---

> **Nota sobre la base de datos:**
>
> Este proyecto utiliza **Supabase** como base de datos externa (PostgreSQL en la nube). No se incluye ni se levanta un contenedor de base de datos local. Configura las credenciales de Supabase en tu `.env`.

---

## 4. Diseño y Endpoints

- El **Diseño Técnico** (Schema DBML y Contrato de API) se encuentra en la carpeta: `/_docs/Diseño Técnico del Proyecto.md`.
- El **Documento de Visión** se encuentra en: `/_docs/Vision del Proyecto - FSI.md`.# Backend del Sistema de Información "UNSA Connect" (FSI)

---

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
