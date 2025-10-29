FROM node:18-alpine AS build-frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci || npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build-frontend /frontend/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

