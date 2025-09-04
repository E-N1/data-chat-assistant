#!/bin/bash
# --------------------------------------------------
# AI Assistant Start Script
# --------------------------------------------------

# Default mode: development
ENV_MODE=${1:-dev}
ENV_FILE=".env"

if [ "$ENV_MODE" == "prod" ]; then
  ENV_FILE=".env.production"
  echo "----------------------------------------"
  echo "|  Starting Production Environment...   |"
  echo "----------------------------------------"
else
  echo "----------------------------------------"
  echo "|  Starting Development Environment...  |"
  echo "----------------------------------------"
fi

# Check if ENV file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "ENV file $ENV_FILE not found!"
  exit 1
fi

# Start Docker Compose
docker compose --env-file "$ENV_FILE" up --build -d


# Check if Postgres service is up
docker compose exec -T db pg_isready -U $POSTGRE_USER

# Wait for Postgres to be ready
echo "Waiting for database to be ready..."
until docker compose exec -T db pg_isready -U $POSTGRES_USER -d $POSTGRES_DB > /dev/null 2>&1; do
  echo "Waiting..."
  sleep 1
done
echo "Database is ready!"

# Apply Prisma migrations
if [ "$ENV_MODE" == "dev" ]; then
  echo "Applying Prisma migrations (Development)..."
  docker compose exec -T nextjs npx prisma migrate dev --name init --preview-feature
else
  echo "Applying Prisma migrations (Production)..."
  docker compose exec -T nextjs npx prisma migrate deploy
fi

echo "✅ Done! Next.js is running at http://localhost:3000"
