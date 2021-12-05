FROM node
WORKDIR /app
COPY package.json  ./
COPY package-lock.json  ./
RUN npm install --production
RUN npm install node-sass
RUN npm i --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

