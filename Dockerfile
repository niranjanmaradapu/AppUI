FROM node:12.18.3
WORKDIR /app
COPY package-lock.json  ./
RUN npm install --production
RUN npm install node-sass
#RUN npm i --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

