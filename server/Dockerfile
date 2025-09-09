FROM node:20.18.0-alpine3.20 AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20.18.0-alpine3.20 AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# npm run build

EXPOSE 3000

CMD [ "npm", "start" ]