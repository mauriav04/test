# Etapa 1: Construcción de la aplicación Angular
FROM node:22.11 AS build

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto de los archivos de la aplicación Angular
COPY . .

# Construimos la aplicación Angular en modo producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiamos los archivos generados por el build de Angular a Nginx
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Exponemos el puerto 80 para servir la aplicación
EXPOSE 80

# Comando para mantener Nginx ejecutándose
CMD ["nginx", "-g", "daemon off;"]
