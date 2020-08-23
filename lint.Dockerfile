FROM node:14-alpine
WORKDIR /srv/app
COPY . .
RUN npm install
RUN npm run format

