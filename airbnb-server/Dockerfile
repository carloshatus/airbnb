FROM node:latest
LABEL maintainer=${MAINTAINER}
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE ${PORT}
CMD ["npm", "start"]