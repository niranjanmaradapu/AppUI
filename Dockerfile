FROM node
WORKDIR /app
COPY package.json  ./
COPY package-lock.json  ./
RUN npm install --production
RUN npm install node-sass
COPY . .
EXPOSE 3000
CMD ["npm", "start"]