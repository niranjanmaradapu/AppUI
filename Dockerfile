FROM node:latest
WORKDIR /app
COPY package.json  ./
COPY package-lock.json  ./
RUN npm install --production
RUN npm install node-sass
RUN npm i --legacy-peer-deps
RUN chmod +x src/index.js
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

