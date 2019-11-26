FROM node:10

WORKDIR /saf-scrum

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]