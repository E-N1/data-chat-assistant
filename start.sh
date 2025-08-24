#!/bin/bash

# --------------------------------------------------
# AI Assistant Start Script
# --------------------------------------------------

# Default: start development
ENV_MODE=${1:-dev}

if [ "$ENV_MODE" == "dev" ]; then
  ENV_FILE=".env.development"
  echo "----------------------------------------"
  echo "|  Starting Development Environment...  |"
  echo "----------------------------------------"
elif [ "$ENV_MODE" == "prod" ]; then
  ENV_FILE=".env.production"
  echo "----------------------------------------"
  echo "|  Starting Production Environment...   |"
  echo "----------------------------------------"
else
  echo "Invalid option. Use 'dev' or 'prod'."
  exit 1
fi

# Check if ENV file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "ENV file $ENV_FILE not found!"
  exit 1
fi

# Start Docker Compose
docker compose --env-file "$ENV_FILE" up --build -d

# Apply Prisma migrations
if [ "$ENV_MODE" == "dev" ]; then
  echo "Applying Prisma migrations (Development)..."
  docker compose exec nextjs npx prisma migrate dev --name init
else
  echo "Applying Prisma migrations (Production)..."
  docker compose exec nextjs npx prisma migrate deploy
fi

echo "✅ Done! Next.js is running at http://localhost:3000"
