# Usar una imagen oficial de Node.js (v18 es recomendada para Strapi v5) y compatible con sharp
FROM node:20-bullseye

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /opt/app

# Instalar dependencias necesarias para compilar sharp y Strapi
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libc6-dev \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar el package.json y yarn.lock al contenedor
COPY package.json ./
COPY yarn.lock ./

# Instalar las dependencias
# Use frozen-lockfile to keep installs deterministic.
RUN yarn install --frozen-lockfile

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Añadir node_modules/.bin al PATH
ENV PATH="/opt/app/node_modules/.bin:$PATH"

# Exponer el puerto que Strapi usa por defecto
EXPOSE 1337

# El comando para iniciar la aplicación en modo desarrollo
#CMD ["yarn", "develop"]
CMD ["sh", "-c", "yarn build && yarn develop"]
