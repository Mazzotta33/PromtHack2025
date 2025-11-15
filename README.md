# Docker Compose Setup

Этот проект использует Docker Compose для запуска всех сервисов: фронтенда, бэкенда, PostgreSQL и Qdrant.

## Структура

- **Frontend**: React + Vite приложение, собранное в статические файлы и обслуживаемое через nginx
- **Backend**: FastAPI приложение на Python с PyTorch
- **PostgreSQL**: База данных для хранения данных приложения
- **Qdrant**: Векторная база данных для RAG функциональности

## Требования

- Docker
- Docker Compose
- Файл `.env` в папке `Backend/` с необходимыми переменными окружения

## Переменные окружения

Создайте файл `Backend/.env` с необходимыми переменными. Если переменные не указаны, будут использованы значения по умолчанию:

```env
# Database (значения по умолчанию: postgres/postgres/prompt_hack_db)
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_PORT=5432

# Application (значения по умолчанию: 8000/3000)
APP_PORT=8000
FRONTEND_PORT=3000

# Qdrant (значения по умолчанию: 6333/6334)
QDRANT_PORT=6333
QDRANT_GRPC_PORT=6334

# CORS (должен включать URL фронтенда)
ORIGINS=http://localhost:3000,http://localhost:8000

# Другие необходимые переменные
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/prompt_hack_db
IAM_TOKEN=your_iam_token
FOLDER_ID=your_folder_id
S3_BUCKET=your_s3_bucket
S3_ENDPOINT=your_s3_endpoint
S3_ACCESS_KEY=your_s3_access_key
S3_SECRET_KEY=your_s3_secret_key
OPENAI_TOKEN=your_openai_token
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

## Запуск

1. Убедитесь, что файл `Backend/.env` настроен правильно
2. Перейдите в папку `Backend/`:

```bash
cd Backend
```

3. Запустите все сервисы:

```bash
docker-compose up -d
```

4. Для просмотра логов:

```bash
docker-compose logs -f
```

5. Для остановки:

```bash
docker-compose down
```

6. Для остановки и удаления volumes (очистка данных):

```bash
docker-compose down -v
```

## Порты

- **Frontend**: http://localhost:3000 (или значение FRONTEND_PORT)
- **Backend API**: http://localhost:8000 (или значение APP_PORT)
- **PostgreSQL**: localhost:5432 (или значение POSTGRES_PORT)
- **Qdrant**: localhost:6333 (или значение QDRANT_PORT)

## Пересборка

Если вы изменили код и нужно пересобрать образы:

```bash
cd Backend
docker-compose up -d --build
```

## Отдельный запуск сервисов

Для запуска только бэкенда и зависимостей:

```bash
cd Backend
docker-compose up -d db qdrant app
```

Для запуска только фронтенда (требует запущенный бэкенд):

```bash
cd Backend
docker-compose up -d frontend
```

**Примечание**: Все команды docker-compose нужно запускать из папки `Backend/`, так как файл `docker-compose.yml` находится там.

