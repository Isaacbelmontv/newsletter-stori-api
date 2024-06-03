FROM node:20.11.1-alpine

# RUN docker run --name my_db -e POSTGRES_PASSWORD=123456 -d postgres

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run migration:generate

RUN npm run migration:run

docker --logs

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
