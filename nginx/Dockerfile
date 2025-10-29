# Build frontend
FROM node:18-alpine AS build-frontend
WORKDIR /frontend
COPY ../frontend/package.json ../frontend/package-lock.json* ./
RUN npm ci || npm install
COPY ../frontend .
RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build-frontend /frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80


