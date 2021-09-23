FROM node
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
RUN npm install node-sass
COPY src /app/src
COPY public  /app/public
EXPOSE 3000
CMD ["npm", "start"]