FROM node:18-alpine AS build-frontend
WORKDIR /frontend
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build-frontend /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80