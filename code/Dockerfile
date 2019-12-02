FROM node:slim

WORKDIR /app

COPY ./package.json /app/package.json

RUN cd /app && npm install

COPY . /app

CMD node /app/index.js

EXPOSE 8080