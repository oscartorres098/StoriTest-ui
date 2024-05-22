FROM node:18.13

WORKDIR /app

USER root

COPY package*.json ./

RUN chown -R node:node /app

USER node

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
