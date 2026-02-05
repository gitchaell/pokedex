# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json tsconfig.build.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY src ./src

# Compilar TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Instalar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar código compilado desde el stage anterior
COPY --from=builder /app/dist ./dist

# Copiar archivos estáticos/datos necesarios
COPY src/pokemon/infrastructure/seed-data.json ./dist/pokemon/infrastructure/

# Exponer puerto (Cloud Run usa 8080 por defecto)
EXPOSE 8080

# Establecer variable de entorno
ENV PORT=8080

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
