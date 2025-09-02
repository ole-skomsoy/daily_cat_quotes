# Use Node.js 20
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "index.js"]