ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt 

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
