FROM node:20-alpine

WORKDIR /app

# Dependencies installieren
COPY package*.json ./
RUN npm install

# Source Code kopieren
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
