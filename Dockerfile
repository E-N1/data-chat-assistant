FROM node:20-alpine

WORKDIR /app

# Dependencies installieren
COPY package*.json ./
RUN npm install

# Prisma Client für Linux generieren
COPY prisma ./prisma
RUN npx prisma generate

# Source Code kopieren
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
