FROM node:14-alpine as build-stage
WORKDIR /srv/app
COPY . .
RUN npm install
RUN npm run build

FROM node:14-alpine as production-dependencies
WORKDIR /srv/app
COPY package.json .
COPY package-lock.json .
RUN npm install --only=prod

FROM node:14-alpine as final-stage
WORKDIR /srv/app
COPY --from=build-stage /srv/app/dist .
COPY --from=production-dependencies /srv/app .

EXPOSE 3000
CMD ["node", "main.js"]
