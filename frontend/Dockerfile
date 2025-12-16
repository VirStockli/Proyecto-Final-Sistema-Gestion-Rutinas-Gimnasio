FROM node:18-alpine

WORKDIR /app

# Copiamos solo los archivos de requisitos primero (para aprovechar el caché)
COPY package.json ./

# Instalamos las dependencias (Genera un node_modules 100% Linux)
RUN npm install

# Copiamos el resto del código (El .dockerignore evitará que se cuele la basura)
COPY . .

EXPOSE 5173

# Simplemente corremos el comando de desarrollo
CMD ["npm", "run", "dev"]