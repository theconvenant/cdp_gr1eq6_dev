FROM node:10
# Create app directory
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "index.js" ]