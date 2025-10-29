FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
# Install with dev deps for TypeScript build
RUN npm ci || npm install

COPY . .

# Build TypeScript
RUN npm run build

ENV PORT=4000
EXPOSE 4000

# Run migrations and seeds on container start, then start compiled server
CMD ["sh", "-c", "npx knex migrate:latest && npx knex seed:run && node dist/index.js"]


