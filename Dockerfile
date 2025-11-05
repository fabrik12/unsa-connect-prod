
# Usar una imagen oficial de Node.js (v18 es recomendada para Strapi v5)
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /opt/app

# Copiar el package.json y yarn.lock al contenedor
COPY package.json ./
COPY yarn.lock ./

# Instalar las dependencias
RUN yarn install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Exponer el puerto que Strapi usa por defecto
EXPOSE 1337

# El comando para iniciar la aplicación en modo desarrollo
CMD ["yarn", "develop"]