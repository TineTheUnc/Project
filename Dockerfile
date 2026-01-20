FROM node:latest

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

CMD ["node",".output/server/index.mjs"]