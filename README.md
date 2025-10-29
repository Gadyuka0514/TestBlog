Простой блог (TypeScript: Node.js + Postgres + React + Docker)

Стек:

- Backend: Node.js (Express, TypeScript), Knex, PostgreSQL
- Frontend: React (Vite, React Router, TypeScript)
- Docker: Postgres, API, Nginx (проксирование API и раздача фронтенда)

Структура проекта:

- backend — API, миграции, сиды
- frontend — SPA (FSD-структура упрощенная): `src/app`, `src/pages`, `src/entities`, `src/shared`
- nginx — Dockerfile для сборки фронтенда и конфиг Nginx
- docker-compose.yml — оркестрация сервисов

Запуск в Docker (рекомендуется):

1. Создайте файл .env при необходимости (по умолчанию используются значения из docker-compose):
   - POSTGRES_DB=blog
   - POSTGRES_USER=bloguser
   - POSTGRES_PASSWORD=blogpass
2. Собрать и запустить:

```bash
docker compose up -d --build
```

3. Открыть в браузере:

- Фронтенд: http://localhost/
- API: http://localhost/api/health

Примечание: контейнер API при старте выполняет миграции и сиды (3–4 статьи + пара комментариев). Backend компилируется TypeScript → JS в образе.

Локальный запуск без Docker (требуется установленный Postgres):

1. Настройте базу данных и переменные окружения (пример):

```bash
# В корне проекта или в backend/.env
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=blog
DATABASE_USER=bloguser
DATABASE_PASSWORD=blogpass
PORT=4000
```

2. Установите зависимости, соберите TS и выполните миграции/сиды:

```bash
cd backend
npm install
npm run build
npx knex migrate:latest
npx knex seed:run
npm start
```

API будет доступен на http://localhost:4000

3. Фронтенд:

```bash
cd frontend
npm install
npm run dev
```

Откройте http://localhost:5173 (запросы к /api будут проксироваться на http://localhost:4000)

REST API:

- GET /api/articles — список статей
- GET /api/articles/{id} — статья с комментариями
- POST /api/articles — добавить статью (body: { title, content })
- POST /api/articles/{id}/comments — добавить комментарий (body: { author_name, content })

Миграции/Сиды (Knex):

```bash
cd backend
npx knex migrate:latest
npx knex seed:run
```

Структура FSD (фронтенд):

- src/app — корневые компоненты, маршрутизация, стили
- src/pages — страницы: articles, article, new-article
- src/entities — бизнес-сущности (article, comment): api
- src/shared — общий код: api-клиент
