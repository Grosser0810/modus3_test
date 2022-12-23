FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install bcrypt

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
