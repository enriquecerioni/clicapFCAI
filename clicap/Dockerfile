FROM node:20.18.0-alpine3.20 AS deps
WORKDIR /app
COPY ./package.json ./
RUN npm install

FROM node:20.18.0-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# RUN npm run build

EXPOSE 3001

CMD [ "npm", "start" ]