FROM node:10-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3030
CMD [ "npm", "start" ]
