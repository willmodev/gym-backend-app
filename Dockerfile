# Instalar las dependencias
FROM node:18.18.0-alpine as dev-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

FROM node:18.18.0-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && \
    pnpm run test && \
    pnpm run build

FROM node:18.18.0-alpine as prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile

FROM node:18.18.0-alpine as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Comando para iniciar la aplicación
CMD [ "node", "dist/src/app.js" ]
